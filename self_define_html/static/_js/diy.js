$(function() {
    HYD.DIY = HYD.DIY ? HYD.DIY: {},
        HYD.DIY.Unit = HYD.DIY.Unit ? HYD.DIY.Unit: {},
        HYD.DIY.PModules = HYD.DIY.PModules ? HYD.DIY.PModules: [],
        HYD.DIY.LModules = HYD.DIY.LModules ? HYD.DIY.LModules: [];
    var t = $("#diy-contain"),
        n = $("#diy-ctrl"),
        e = 0,
        i = 0,
        o = 0;
    HYD.DIY.constant = {
        diyoffset: $(".diy").offset()
    },
        HYD.DIY.getTimestamp = function() {
            var t = new Date;
            return "" + t.getFullYear() + parseInt(t.getMonth() + 1) + t.getDate() + t.getHours() + t.getMinutes() + t.getSeconds() + t.getMilliseconds()
        },
        HYD.DIY.add = function(n, l) {
            //console.log(n)
            n.content || (n.content = {}),
            "undefined" == typeof n.content.modulePadding && (n.content.modulePadding = 5);
            var a = _.template($("#tpl_diy_con_type" + n.type).html(), n),
                c = _.template($("#tpl_diy_conitem").html(), {
                    html: a
                }),
                d = $(c);
            n.dom_conitem = d;
            var s = d.find(".diy-conitem-action"),
                r = (s.find(".j-edit"), s.find(".j-del"));
            s.click(function() {
                $(".diy-conitem-action").removeClass("selected"),
                    $(this).addClass("selected"),
                    HYD.DIY.edit(n)
            });
            var p = "";
            return n.draggable ? (r.click(function() {
                return HYD.DIY.del(n),
                    !1
            }), p = ".drag") : (r.remove(), p = ".nodrag"),
                t.find(p).append(d),
                l = !!l && l,
            l && s.click(),
                n.draggable ? HYD.DIY.LModules.push(n) : HYD.DIY.PModules.push(n),
                !1
        },
        HYD.DIY.init = function(n, l) {
            n.content || (n.content = {}),
            "undefined" == typeof n.content.modulePadding && (n.content.modulePadding = 5);
            var a = _.template($("#tpl_diy_con_type" + n.type).html(), n),
                c = _.template($("#tpl_diy_conitem").html(), {
                    html: a
                });
            d = $(c);
            n.dom_conitem = d;
        },
        HYD.DIY.edit = function(t) {
            if(t.content.used_ids && !t.content.used_ids_desc){
                if((t.type == 4 || t.type ==5 || t.type == 19) && t.content.goodsize == 3){
                    $.ajax({
                        type: "POST",//方法
                        async:false,
                        url: "/Manage/HomePageApi/getCategoryDesc",//表单接收url
                        data: {used_ids:t.content.used_ids},
                        success: function (ret) {
                            var h = '';
                            for(var i in ret.data){
                                h += '<li><span>';
                                if(ret.data[i]['parent']['name']){
                                    h += ret.data[i]['parent']['name']+'&gt';
                                }
                                h+= ret.data[i]['parent']['name'] + '</span></li>';
                            }
                            t.content.used_ids_desc = h;
                        },
                        error: function () {
                            layer.msg('操作失败');
                        }
                    });
                }
            }
            t.content || (t.content = {}),
            "undefined" == typeof t.content.modulePadding && (t.content.modulePadding = 5),
                n.find(".diy-ctrl-item[data-origin='item']").remove();
            var e = $("#tpl_diy_ctrl").html(),
                i = _.template($("#tpl_diy_ctrl_type" + t.type).html(), t),
                o = _.template(e, {
                    html: i
                }),
                l = $(o);

            var touchLabel = l.find(".touch_select_link");
            if(touchLabel.length > 0){
                initSelectLink(false,storeUid,touchLabel,'#showSelectLink',function (domain,url) {
                    if(t.type === 2){
                        l.find("input[name=layout]").val(url);
                        l.find("input[name=layout]").trigger("change");
                    }else{
                        alert(33232);
                    }
                });
            }
            return n.append(l),
                HYD.DIY.repositionCtrl(t.dom_conitem, l),
                HYD.DIY.bindEvents(l, t),
                l.show().siblings(".diy-ctrl-item").hide(),
                !1
        },
        HYD.DIY.repositionCtrl = function(t, n) {
            var e = t.offset().top,
                i = e - HYD.DIY.constant.diyoffset.top;
            n.css("marginTop", i),
                $("html,body").animate({
                        scrollTop: i
                    },
                    300)
        },
        HYD.DIY.del = function(t) {
            var e = 0,
                i = 0,
                o = 0;
            for (var a = HYD.DIY.LModules,
                     c = HYD.DIY.LModules.length,
                     d = 0; d < c; d++) if (a[d].id == t.id) {
                a.splice(d, 1);
                break
            }
            t.dom_conitem.remove(),
                n.find(".diy-ctrl-item[data-origin='item']").remove()
        },
        HYD.DIY.bindEvents = function(t, n) {
            HYD.DIY.Unit["event_type" + n.type](t, n)
        },
        HYD.DIY.reCalcPModulesSort = function() {
            _.each(HYD.DIY.LModules,
                function(t, n) {
                    t.sort = t.dom_conitem.index()
                })
        },
        HYD.DIY.Unit.getData = function() {
            HYD.DIY.reCalcPModulesSort();
            var t = {
                page: {},
                PModules: {},
                LModules: {}
            };
            t.page.title = $(".j-pagetitle-selfTitle").val(),
                t.page.html_title = $(".j-pagetitle-ipt").val(),
                t.page.share_title = $(".j-pagetitle-shareTitle").val(),
                t.page.share_desc = $(".j-pagetitle-shareDesc").val(),
                t.page.share_img = $(".j-pagetitle-shareImg").val(),
                t.page.cover_img = $(".j-pagetitle-coverImg").val(),
                t.page.subtitle = $(".j-pagesubtitle-ipt").val(),
                t.page.view_pic = $(".j-view_pic-ipt").prop("src"),
                t.page.praise_num = $(".j-pagepraisenum").val(),
                t.page.pv_num = $(".j-pagepvnum").val(),
                t.PModules = HYD.DIY.PModules,
                t.page.goto_time = $(".j-gototime-ipt").val(),
                t.page.hasMargin = $(".j-page-hasMargin:checked").val() || 1,
                t.page.backgroundColor = $("#j-page-backgroundColor").data("color") || "#f8f8f8";
            for (var n = [], e = 0; e < HYD.DIY.LModules.length; e++) {
                var i = HYD.DIY.LModules[e];
                "" != i && (n[i.sort] = i)
            }
            t.LModules = n;
            var i = $.extend(!0, {},
                t);
            return _.each(i.LModules,
                function(t) {
                    t.dom_conitem = null,
                        t.dom_ctrl = null,
                        t.ue = null
                }),
                _.each(i.PModules,
                    function(t) {
                        t.dom_conitem = null,
                            t.dom_ctrl = null,
                            t.ue = null
                    }),
                i
        },
        HYD.DIY.Unit.html_encode = function(t) {
            var n = "";
            return 0 == t.length ? "": (n = t.replace(/&/g, "&amp;"), n = n.replace(/</g, "&lt;"), n = n.replace(/>/g, "&gt;"), n = n.replace(/ /g, "&nbsp;"), n = n.replace(/\'/g, "&#39;"), n = n.replace(/\"/g, "&quot;"))
        },
        HYD.DIY.Unit.html_decode = function(t) {
            var n = "";
            return 0 == t.length ? "": (n = t.replace(/&amp;/g, "&"), n = n.replace(/&lt;/g, "<"), n = n.replace(/&gt;/g, ">"), n = n.replace(/&nbsp;/g, " "), n = n.replace(/&#39;/g, "'"), n = n.replace(/&quot;/g, '"'))
        },
        HYD.DIY.getProduct=function(url,param,callBack){
            $.ajax({
                url: url,
                type: "get",
                dataType: "json",
                data: param,
                beforeSend: function() {
                    $.jBox.showloading()
                },
                success: function(t,e){
                    callBack(t,e);
                },
                complete:function(){
                    // $.jBox.closeLoad()
                }
            })
        }
}),
    $(function() {
        var t = function(t) {
            var n = t;
            return n = n.replace(/\<script\>/, ""),
                n = n.replace(/\<\/script\>/, "")
        };

        $(document).on("change", ".input,.diy-videowebsite input",
            function() {
                var t = $(this).val();
                t = t.replace(/\</, "&lt;").replace(/\</, "&lt;"),
                    t = t.replace(/\>/, "&gt;").replace(/\>/, "&gt;"),
                    t = t.replace(/\//, "/"),
                    $(this).val(t)
            }),
            HYD.DIY.Unit.event_type2 = function(t, n) {
                var e = n.dom_conitem,
                    i = t,
                    o = $("#tpl_diy_con_type2").html(),
                    l = $("#tpl_diy_ctrl_type2").html();
                n.dom_ctrl = t;
                var a = function() {
                    var t = $(_.template(o, n));
                    e.find(".members_con").remove().end().append(t);
                    var a = $(_.template(l, n));
                    i.empty().append(a),
                        HYD.DIY.Unit.event_type2(i, n)
                    initSelectLink(false,storeUid,i.find('.touch_select_link'),'#showSelectLink',function (domain,url) {
                        // n.content.layout = domain+url;
                        i.find("input[name=layout]").val(url);
                        i.find("input[name=layout]").trigger("change");
                    });
                };
                i.find("input[name='title'],input[name='direction'],input[name='style']").change(function() {
                    var t = $(this).val(),
                        e = $(this).attr("name");
                    n.content[e] = t;
                    if(e == "style" && t == 4){
                        n.content['url_name'] = "更多";
                    }else{
                        n.content['url_name'] = "";
                    }
                    a()
                }),
                    i.find("input[name='layout']").change(function() {
                        var t = $(this).val();
                        n.content.layout = t,
                            a()
                    }),
                    i.find("input[name='url_name']").change(function() {
                        var t = $(this).val();
                        n.content.url_name = t,
                            a()
                    }),
                    i.find("input[name='fontSize']").change(function() {
                        var t = $(this).val();
                        e.find(".notice-con").removeClass("font16 font18 font20").addClass(t),
                            n.content.fontSize = t
                    }),
                    i.find(".j-imgNav-cp").on("mouseenter",
                        function() {
                            var t = $(this).data("#FFF");
                            $(this).ColorPicker({
                                color: t,
                                onShow: function(t) {
                                    return $(t).fadeIn(500),
                                        !1
                                },
                                onHide: function(t) {
                                    return $(t).fadeOut(500),
                                        !1
                                },
                                onChange: function(t, e, i) {
                                    var e = "#" + e;
                                    n.content.BackgroundColor = e,
                                        a()
                                }
                            })
                        }),
                    i.find(".j-textColor-cp").on("mouseenter",function() {
                        var t = $(this).data("#FFF");
                        $(this).ColorPicker({
                            color: t,
                            onShow: function(t) {
                                return $(t).fadeIn(500),
                                    !1
                            },
                            onHide: function(t) {
                                return $(t).fadeOut(500),
                                    !1
                            },
                            onChange: function(t, e, i) {
                                var e = "#" + e;
                                n.content.titleColor = e,
                                    a()
                            }
                        })
                    }),

                    i.find(".colpck-bgColor").ColorPicker({
                        color: n.content.bgColor,
                        onShow: function(t) {
                            return $(t).fadeIn(100),
                                !1
                        },
                        onHide: function(t) {
                            return $(t).fadeOut(100),
                                !1
                        },
                        onChange: function(t, o, l) {
                            var o = "#" + o;
                            n.content.bgColor = o,
                                i.find(".colpck-bgColor").css("background-color", o),
                                e.find(".members_notice").css("background-color", o)
                        }
                    }),
                    i.find(".colpck-fontColor").ColorPicker({
                        color: n.content.fontColor,
                        onShow: function(t) {
                            return $(t).fadeIn(100),
                                !1
                        },
                        onHide: function(t) {
                            return $(t).fadeOut(100),
                                !1
                        },
                        onChange: function(t, o, l) {
                            var o = "#" + o;
                            n.content.fontColor = o,
                                i.find(".colpck-fontColor").css("background-color", o),
                                e.find(".j-notice").css("color", o)
                        }
                    }),
                    i.find(".j-slider").slider({
                        min: 0,
                        max: 50,
                        step: 1,
                        animate: "fast",
                        value: n.content.modulePadding,
                        slide: function(t, n) {
                            e.find(".modulePadding").css({
                                "padding-top": n.value,
                                "padding-bottom": n.value
                            }),
                                i.find(".j-ctrl-showheight").text(n.value + "px")
                        },
                        stop: function(t, e) {
                            n.content.modulePadding = parseInt(e.value)
                        }
                    })
            },
            HYD.DIY.Unit.event_type100 = function(t, n) {
                var e = n.dom_conitem,
                    i = t,
                    o = $("#tpl_diy_con_type100").html(),
                    l = $("#tpl_diy_ctrl_type100").html();
                n.dom_ctrl = t;
                n.content.storeId = i.find(".store_id").val();
                var a = function() {
                        var t = $(_.template(o, n));
                        e.find(".members_con").remove().end().append(t);
                        var a = $(_.template(l, n));
                        i.empty().append(a),
                            HYD.DIY.Unit.event_type100(i, n)
                    },
                    a2 = function() {
                        var t = $(_.template(o, n));
                        e.find(".members_con").remove().end().append(t);
                        var a = $(_.template(l, n));
                        i.empty().html(a),
                            HYD.DIY.Unit.event_type100(i, n)
                    },
                    c = function() {
                        e.find(".J_sliderGoods").each(function() {
                            var t = $(this),
                                n = t.find("li").width(),
                                e = t.find("li").height();
                            t.css({
                                height: e
                            }).find("li").css("width", n - 2)
                        })
                    };

                d = function() {
                    e.find(".J_sliderGoods").each(function() {
                        var t = $(this),
                            n = t.find("li").width(),
                            e = t.find("li").height();
                        t.css({
                            height: e
                        }).find("li").css("width", n - 2)
                    })
                };
                selectProduct = function(){
                    var item = n.content;
                    if(item.layoutstyles == 2 && (((item.goodsize == 2 || item.goodsize == 4 || item.goodsize == 5 || item.goodsize == 6 || item.goodsize == 7) && item.num >0) || (item.goodsize == 3 && item.num >0 && item.used_ids))){
                        $.ajax({
                            url: "/Manage/HomePageApi/getProduct" + "?v=" + Math.round(100 * Math.random()),
                            type: "POST",
                            dataType: "json",
                            data: {p:1,type:'group',select_type:n.content.goodsize,'page_size':n.content.num,used_ids:n.content.used_ids,pro_from:n.content.layoutstyles},
                            beforeSend: function () {
                                // $.jBox.showloading()
                            },
                            success: function (ret) {
                                t=ret.list;
                                _.each(t, function (i) {
                                    i.pic = (n.content.layout == 1?i.thumb+'?imageMogr2/thumbnail/200x':i.thumb+'?imageMogr2/thumbnail/720x'),
                                        i.thumb =  i.thumb+'?imageMogr2/thumbnail/80x',
                                        i.link = '/VCrowd/Crowd/detail?id='+ i.id
                                });
                                n.content.goodslist = t;
                                a2();
                            }
                        })
                    }else{
                        a();
                    }
                    c();
                };
                i.find("input[name='layout']").change(function() {
                    var t = $(this).val();
                    n.content.layout = t,
                        a(),
                        c()
                }),
                    i.find('input[name="goodsize"]').change(function(t) {
                        var e = $(this),
                            i = e.val();
                        n.content.goodsize = i;
                        n.content.goodslist = [];
                        n.content.used_ids = '';
                        n.content.used_ids_desc = '';
                        if(n.content.goodsize == 1) n.content.num = 9;
                        selectProduct();
                    }),
                    i.find('input[name="num"]').change(function(t) {
                        var e = $(this),
                            i = e.val();
                        n.content.num = i;
                        selectProduct();
                    }),
                    i.find("input[name='goodstyle']").change(function() {
                        var t = $(this).val();
                        n.content.goodstyle = t,
                            a()
                    }),
                    i.find("input[name='layoutstyles']").change(function() {
                        var t = $(this).val();
                        n.content.layoutstyles = t;
                        n.content.goodsize = 1;
                        n.content.num = 0;
                        n.content.used_ids = '';
                        n.content.used_ids_desc = '';
                        n.content.goodslist = [];
                        a()
                    }),
                    i.find("input[name='showName']").change(function() {
                        var t = $(this).is(":checked");
                        n.content.showName = t,
                            a()
                    }),
                    i.find("input[name='goodstxt']").change(function() {
                        var t = $(this).val();
                        e.find(".goods-btn a").text($(this).val()),
                            n.content.goodstxt = t,
                            a()
                    }),
                    i.find("input[name='showIco']").change(function() {
                        var t = $(this).val();
                        n.content.showIco = t,
                            a()
                    }),
                    i.find("input[name='showPrice']").change(function() {
                        var t = $(this).val();
                        n.content.showPrice = t,
                            a()
                    }),
                    i.find(".j-btn-add,.j-btn-modify").click(function() {
                        HYD.popbox.GoodsAndGroupPicker("group",
                            function(t) {
                                n.content.group = t,
                                    a(),
                                    c()
                            })
                    }),
                    i.find(".j-delgoods").click(function() {
                        var t = $(this).parents("li").index();
                        n.content.used_ids = n.content.used_ids.replace(n.content.goodslist[t].id +",", '');
                        return n.content.goodslist.splice(t, 1),
                            a(c),
                            d(),
                            !1
                    }),
                    i.find(".j-select-category").click(function(){
                        $.post("/Manage/TeamBuy/getCateCategory", {storeId:n.content.store,type:'localgroup'},
                            function(t) {
                                var s = _.template($("#tpl_item_class").html(), {
                                        data: t.data
                                    }),
                                    tp = $(s);
                                $.jBox.show({
                                    title: "请选择分类",
                                    width: 600,
                                    height: 600,
                                    content: tp,
                                    onOpen: function() {
                                        // n.content.used_ids = "[]";
                                        qi(tp,n.content, true);
                                    },
                                    btnOK: {
                                        onBtnClick: function(t) {
                                            $.jBox.close(t);
                                            qe(t,n.content,i,true);
                                            selectProduct();

                                        }
                                    }
                                })
                            })
                    }),
                    i.find(".j-addgoods").click(function() {
                        var t_o = n.content.used_ids;
                        t = !t_o ? [] : t_o.split(",");
                        return 3 == n.content.layout && t.length >= 20 ? HYD.hint("warning", "您最多可以添加20个商品") : ($.selectGoods({
                            selectMod: 2,
                            selectIds: t,
                            callback: function(t, e) {
                                n.content.goodslist = n.content.goodslist.concat(t);
                                3 == n.content.layout && n.content.goodslist.length > 20 && (n.content.goodslist.length = 20, HYD.hint("warning", "您最多可以添加20个商品"));
                                a(c);
                                d();
                                var l_t_o = '';
                                if(t_o) l_t_o =t_o+',';
                                n.content.used_ids = l_t_o+e.join(',')+',';
                            }
                        }, {p:1,type:'group',select_type:n.content.goodsize,'page_size':n.content.num,used_ids:t_o,pro_from:n.content.layoutstyles},'/Manage/HomePageApi/getProduct'), !1)
                    }),
                    i.find(".img-list>li .img-move-left").on("click",
                        function() {
                            var t = $(this),
                                e = t.closest("li").index(),
                                i = t.closest("li");
                            if (0 != e) {
                                e--;
                                t.closest("ul").find("li").eq(e).before(i);
                                var o = n.content.goodslist.slice(e + 1, e + 2)[0];
                                n.content.goodslist.splice(e + 1, 1);
                                n.content.goodslist.splice(e, 0, o);
                                var idstr = '';
                                for(var i in (n.content.goodslist)){
                                    var item = n.content.goodslist[i];
                                    idstr += item['id'] +",";
                                }
                                n.content.used_ids = idstr;
                                a(c);
                                d()
                            }

                            n.content.used_ids = n.content.used_ids.replace(n.content.goodslist[t].id +",", '');
                            return ! 1
                        }),
                    i.find(".img-list>li .img-move-right").on("click",
                        function() {
                            var t = $(this),
                                e = t.closest("ul").find("li").length - 1,
                                i = t.closest("li").index(),
                                o = t.closest("li");
                            if (i != e - 1) {
                                i++,
                                    t.closest("ul").find("li").eq(i).after(o);
                                var l = n.content.goodslist.slice(i, i + 1)[0];
                                n.content.goodslist.splice(i, 1);
                                n.content.goodslist.splice(i - 1, 0, l);
                                var idstr = '';
                                for(var i in (n.content.goodslist)){
                                    var item = n.content.goodslist[i];
                                    idstr += item['id'] +",";
                                }
                                n.content.used_ids = idstr;
                                a(c);
                                d()
                            }
                            return ! 1
                        }),
                    i.find(".j-slider").slider({
                        min: 0,
                        max: 50,
                        step: 1,
                        animate: "fast",
                        value: n.content.modulePadding,
                        slide: function(t, n) {
                            e.find(".modulePadding").css({
                                "padding-top": n.value,
                                "padding-bottom": n.value
                            }),
                                i.find(".j-ctrl-showheight").text(n.value + "px")
                        },
                        stop: function(t, e) {
                            n.content.modulePadding = parseInt(e.value)
                        }
                    })
            }

    }),
    $(function() {
        HYD.DIY.Unit.verifyWhiteList = ["0", "1"],//白名单
        HYD.DIY.Unit.verify_type2 = function(t) {
            var n = !1,
                e = !0,
                i = function() {
                    n || (t.dom_conitem.find(".diy-conitem-action").click(), n = !0, e = !1)
                };
            if (!t.content) {
                i();
                var o = t.dom_ctrl.find(".j-verify");
                HYD.FormShowError(o, "请选择一个自定义模块")
            }
            return e
        },
        HYD.DIY.Unit.verify_type100 = function(t) {
            var n = !1,
                e = !0,
                i = function() {
                    n || (t.dom_conitem.find(".diy-conitem-action").click(), n = !0, e = !1)
                };
            if (!t.content.goodslist.length) {
                i();
                var o = t.dom_ctrl.find(".j-verify");
                HYD.FormShowError(o, "请至少选择一件商品")
            }
            return e
        },
        HYD.DIY.Unit.verify = function() {
            var t = HYD.DIY.Unit.verifyWhiteList,
                n = !0,
                e = HYD.DIY.LModules.length,
                i = HYD.DIY.PModules.length;
            if (e) for (var o = 0; o < e; o++) {
                var l = HYD.DIY.LModules[o];
                if (t.indexOf(l.type.toString()) < 0 && !HYD.DIY.Unit["verify_type" + l.type](l)) {
                    n = !1;
                    break
                }
            }
            if (i) for (var o = 0; o < i; o++) {
                var l = HYD.DIY.PModules[o];
                if (t.indexOf(l.type.toString()) < 0 && !HYD.DIY.Unit["verify_type" + l.type](l)) {
                    n = !1;
                    break
                }
            }
            return n
        }
    }),
    $(function() {
        $(".j-diy-addModule").click(function() {
            var t = $(this).data("type"),
                n = {
                    id: HYD.DIY.getTimestamp(),
                    type: t,
                    draggable: !0,
                    sort: 0,
                    content: null
                };
            switch (t) {
                case 2:
                    n.content = {
                        title: "标题名称",
                        style: 0,
                        direction: "left",
                        BackgroundColor: "#fd5b6b",
                        titleColor: "#000",
                        modulePadding: 5
                    };
                    break;
                case 100:
                    n.content = {
                        layout: 1,
                        showPrice: !0,
                        showIco: !0,
                        showName: !0,
                        group: null,
                        goodsize: 6,
                        sale_num: 5,
                        goodstyle: 1,
                        layoutstyles: 0,
                        goodstxt: "立即购买",
                        version: 1,
                        modulePadding: 5,
                        goodslist: [
                            {title:'标题1', cover_thumb:'',show_time:'0706',money:8.25,originalPrice:1.26},
                            {title:'标题2', cover_thumb:'',show_time:'0706',money:8.25,originalPrice:1.26},
                            {title:'标题3', cover_thumb:'',show_time:'0706',money:8.25,originalPrice:1.26},
                        ]
                    };
                    break;
            }
            HYD.DIY.add(n, !0)
        }),
            $("#diy-phone .drag").sortable({
                revert: !0,
                placeholder: "drag-highlight",
                stop: function(t, n) {
                    HYD.DIY.repositionCtrl(n.item, $(".diy-ctrl-item[data-origin='item']"))
                }
            }).disableSelection(),
            $(".j-pagetitle").click(function() {
                $(".diy-ctrl-item[data-origin='pagetitle']").show().siblings(".diy-ctrl-item[data-origin='item']").hide()
            }),
            $(".j-pagetitle-ipt").change(function() {
                $(".j-pagetitle").text($(this).val())
            }),
            function() {
                var t = $(window).width();
                t <= 1200 ? $(".diy-actions").css({
                    left: 0,
                    right: 0,
                    width: t
                }) : $(".diy-actions").width($(".content-right").width() - 20)
            } ()
    });