$(function () {
    !function () {
        $(".diy-actions").find(".j-page-addModule").click(function () {
            $(".diy-ctrl-item").each(function () {
                var n = $(this), o = n.data("origin");
                "pagetitle" == o && ($("html,body").animate({scrollTop: "85px"}, 300), n.show().siblings().remove())
            })
        });
        var n = $(".j-page-hasMargin"), o = $("#diy-phone");
        n.length && (n.filter("[value=1]").attr("checked", !0), o.removeClass("noMargin"), n.change(function () {
            var n = $(this).val();
            1 == n ? o.removeClass("noMargin") : o.addClass("noMargin")
        }));
        var t = $("#j-page-backgroundColor");
        if (t.length) {
            var e = "#f8f8f8", a = $("#diy-contain");
            t.css("backgroundColor", e).data("color", e), a.css("backgroundColor", e), t.ColorPicker({
                color: e,
                onShow: function (n) {
                    return $(n).fadeIn(500), !1
                },
                onHide: function (n) {
                    return $(n).fadeOut(500), !1
                },
                onChange: function (n, o, e) {
                    var o = "#" + o;
                    t.css("backgroundColor", o).data("color", o), a.css("backgroundColor", o)
                }
            })
        }
    }(),
        $("#j-savePage").click(function () {
            var n = HYD.DIY.Unit.getData();
            return $.ajax({
                url: '/API/System/editModule',
                type: "post",
                dataType: "json",
                data: {title: n.page.title,cover_img:n.page.cover_img, content: JSON.stringify(n), is_preview: 0},
                beforeSend: function () {
                    $.jBox.showloading()
                },
                success: function (n) {
                    1 == n.status ? (HYD.hint("success", "恭喜您，保存成功！"), setTimeout(function () {
                        //window.location.href = "/Shop/list_custom_module"
                    }, 1e3)) : HYD.hint("danger", "对不起，保存失败：" + n.msg), $.jBox.hideloading()
                }
            }), !1
        }), $("#j-saveAndPrvPage").click(function () {
        var n = HYD.DIY.Unit.getData();
        return $.ajax({
            url: window.location.href,
            type: "post",
            dataType: "json",
            data: {title: n.page.title, content: JSON.stringify(n), is_preview: 1},
            beforeSend: function () {
                $.jBox.showloading()
            },
            success: function (n) {
                1 == n.status ? (HYD.hint("success", "恭喜您，保存成功！"), setTimeout(function () {
                    window.open(n.link)
                }, 1e3)) : HYD.hint("danger", "对不起，保存失败：" + n.msg), $.jBox.hideloading()
            }
        }), !1
    })
});

