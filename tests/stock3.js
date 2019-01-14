function FXSearch() {
    this.ObjVars = "", this.Element = {}
}
function _dropDown(a) {
    a = a || {}, this.dropDownId = "", this.topBarBtn = "", this.badgeSelector = ".js-badge", this.badgeEl = null, this.css = "", this.funcName = "", this.dropDownStatus = !1, this.dropDownDelay = 0, this.dropDownAjax = !1, this.dropDownAjaxUrl = "/", this.dropDownAjaxAction = "", this.dropDownEffect = !0, this.dropDownShowEffectType = "fade", this.dropDownHideEffectType = "fade", this.dropDownEffectDuration = "fast", this.dropDownTimeOutHandle = "", this.dropDownShowTimeOut = 170, this.dropDownHideTimeOut = 170, this.dropDownTimeOutStatus = !1, this.onSuccessCallBackFunction = null, this.onRenderPopup = null, this.$dropdownContent = null, this.signInTranslate = a.signInTranslate || null, this.clearContent = function () {
        return this.$dropdownContent && (this.$dropdownContent.remove(), this.$dropdownContent = null), this
    }, this.render = function () {
        var a = this;
        $("#" + this.dropDownId).stop(!0, !0), this.dropDownTimeOutStatus ? this.clear() : this.dropDownStatus || !this.dropDownAjax && !this.dropDownStatus ? this.dropDownHideTimeOut > 0 ? (this.dropDownTimeOutHandle = setTimeout(function () {
            a.toggleDropDown()
        }, this.dropDownHideTimeOut), this.dropDownTimeOutStatus = !0) : this.toggleDropDown() : this.dropDownAjax && !this.dropDownStatus && (this.clearBadge(), this.dropDownHideTimeOut > 0 ? (this.dropDownTimeOutHandle = setTimeout(function () {
            a.dropDownData()
        }, this.dropDownShowTimeOut), this.dropDownTimeOutStatus = !0) : this.dropDownData(), this.onRenderPopup && this.onRenderPopup())
    }, this.clearBadge = function () {
        $("#" + this.topBarBtn).find(this.badgeSelector).removeClass("block").addClass("displayNone").text(0)
    }, this.setBadgeCount = function (a, b) {
        var c = $("#" + this.topBarBtn).find(this.badgeSelector);
        c.addClass("block").removeClass("displayNone").text(b ? +c.text() + a : a)
    }, this.clear = function () {
        clearTimeout(this.dropDownTimeOutHandle), this.dropDownTimeOutStatus = !1
    }, this.dropDownData = function () {
        var a = this, b = $("#" + this.dropDownId).attr("load");
        $("#" + this.dropDownId).addClass(b), this.clearContent(), $.get(this.dropDownAjaxUrl, {action: this.dropDownAjaxAction}, function (c, d) {
            $("#" + a.dropDownId).removeClass(b);
            var e = null;
            try {
                e = $.parseJSON(c)
            } catch (f) {
                e = null
            }
            "" !== c && null === e && (a.$dropdownContent = $(c), a.$dropdownContent.hasClass("js-instead-popup") ? $("#" + a.dropDownId).addClass("displayNone").after(a.$dropdownContent) : $("#" + a.dropDownId).html(a.$dropdownContent)), jQuery.isFunction(a.onSuccessCallBackFunction) && a.onSuccessCallBackFunction(c)
        }), a.toggleDropDown()
    }, this.toggleDropDown = function () {
        var a = this.dropDownShowEffectType;
        switch ($("#" + this.dropDownId).stop(!0, !0), this.dropDownStatus && (a = this.dropDownHideEffectType), this.dropDownEffect || (a = "NA"), a) {
            case"slide":
                $("#" + this.dropDownId).slideToggle(this.dropDownEffectDuration);
                break;
            case"fade":
                this.dropDownStatus ? $("#" + this.dropDownId).fadeOut(this.dropDownEffectDuration) : $("#" + this.dropDownId).fadeIn(this.dropDownEffectDuration);
                break;
            default:
                this.dropDownStatus ? $("#" + this.dropDownId).removeClass("block").addClass("displayNone") : $("#" + this.dropDownId).removeClass("displayNone").addClass("block")
        }
        this.dropDownTimeOutStatus && (this.dropDownTimeOutStatus = !1), this.dropDownStatus = !this.dropDownStatus
    }
}
function searchPopupResultsBlur(a) {
    switch ($("#" + a).addClass("displayNone").removeClass("displayBlock").html(""), a) {
        case"searchTopPopupResults":
            "searchDirectoryPopupResults" != document.searchCurrentId && -1 == document.searchCurrentId.indexOf("earchPortfolioResults") && (document.getElementById("searchTextTop").value = searchSelf.searchDeafaultVale);
            break;
        case"searchDirectoryPopupResults":
            "searchDirectoryPopupResults" == document.searchCurrentId && (document.getElementById("searchDirectoryText").value = "");
            break;
        default:
            var b = document.searchCurrentId.indexOf("_"), c = document.searchCurrentId.substr(b), d = "searchText_portfolio" + c;
            document.getElementById(d).value = "", $("#selected_country_id" + document.searchCurrentId).html()
    }
}
function side_arrows(a, b) {
    var c = document.getElementById("prev_tab" + document.searchCurrentId).value, d = "";
    switch ("rtl" == $("#doc_direction" + document.searchCurrentId).html() && (a = "left" == a ? "" : "left"), c) {
        case"All":
            d = "search_box_Forex", "left" == a && (d = "");
            break;
        case"Forex":
            d = "search_box_Commodities", "left" == a && (d = "search_box_All");
            break;
        case"Commodities":
            d = "search_box_Indices", "left" == a && (d = "search_box_Forex");
            break;
        case"Indices":
            d = "search_box_Stocks", "left" == a && (d = "search_box_Commodities");
            break;
        case"Stocks":
            d = "search_box_ETFs", "left" == a && (d = "search_box_Indices");
            break;
        case"ETFs":
            d = "search_box_Bonds", "left" == a && (d = "search_box_Stocks");
            break;
        case"Bonds":
            d = "", "left" == a && (d = "search_box_ETFs");
            break;
        case"WorldCentralBanks":
            d = "";
            break;
        default:
            d = "search_box_Forex"
    }
    return d
}
function changeStyleBoxTabContent(a) {
    $(a).unbind("click"), $(a).addClass("selected").siblings().each(function () {
        $(this).is(".selected") && $(this).bind("click", function () {
            changeStyleBoxTabContent(this), changeStyleBoxContent(this)
        }), $(this).removeClass("selected");
        var a = $(this).attr("id");
        $("#" + a + "_html").removeClass("displayBlock"), $("#" + a + "_html").addClass("displayNone")
    });
    var b = $(a).attr("id");
    $("#" + b + "_html").removeClass("displayNone"), $("#" + b + "_html").addClass("displayBlock")
}
function changeStyleBoxContent(a) {
    var b = $(a).attr("pairid"), c = $(a).attr("data-period"), d = $(a).attr("data-action");
    $.ajax({
        url: "/funds/Service/StyleBox",
        type: "POST",
        data: {pairId: b, styleBoxType: c, action: d}
    }).done(function (a) {
        $(".js-" + d).html(a)
    })
}
function changeSentimentsOutlookTabContent(a) {
    $(a).unbind("click"), $(a).addClass("selected").siblings().each(function () {
        $(this).is(".selected") && $(this).bind("click", function () {
            changeSentimentsOutlookTabContent(this)
        }), $(this).removeClass("selected")
    });
    var b = $(a).attr("pairType"), c = $(a).attr("columnsNumber");
    $.get("/common/ajax_func.php", {action: "sentimentsOutlook", pairType: b, columnsNumber: c}, function (a) {
        $("#sentimentsOutlook_html").html(a)
    })
}
function changeTabContent(a) {
    $(a).addClass("selected").siblings().each(function () {
        $(this).removeClass("selected");
        var a = $(this).attr("id");
        $("#" + a + "_html").removeClass("displayBlock"), $("#" + a + "_html").addClass("displayNone")
    });
    var b = $(a).attr("id");
    $("#" + b + "_html").removeClass("displayNone"), $("#" + b + "_html").addClass("displayBlock")
}
function changeQuotesBoxTabContent(a) {
    $(a).unbind("click"), $(a).addClass("selected").siblings().each(function () {
        $(this).is(".selected") && $(this).bind("click", function () {
            changeQuotesBoxTabContent(this)
        }), $(this).removeClass("selected");
        var a = $(this).attr("id");
        $("#" + a + "_html").removeClass("displayBlock"), $("#" + a + "_html").addClass("displayNone")
    });
    var b = $(a).attr("id");
    $("#" + b + "_html").removeClass("displayNone"), $("#" + b + "_html").addClass("displayBlock")
}
function changeSearchTabContent(a) {
    $(a).addClass("selected").siblings().each(function () {
        $(this).removeClass("selected");
        var a = $(this).attr("id");
        $("#" + a + "_html").removeClass("displayBlock"), $("#" + a + "_html").addClass("displayNone")
    });
    var b = $(a).attr("id");
    $("#" + b + "_html").removeClass("displayNone"), $("#" + b + "_html").addClass("displayBlock")
}
function changeRegionsTabContent(a) {
    $(a).unbind("click"), $(a).addClass("selected").siblings().each(function () {
        $(this).is(".selected") && $(this).bind("click", function () {
            changeRegionsTabContent(this), OnClickRegionsHandler(this)
        }), $(this).removeClass("selected");
        var a = $(this).attr("id");
        $("#" + a + "_html").removeClass("displayBlock"), $("#" + a + "_html").addClass("displayNone")
    });
    var b = $(a).attr("id");
    $("#" + b + "_html").removeClass("displayNone"), $("#" + b + "_html").addClass("displayBlock")
}
function changeRegionsIndicesTabContent(a, b) {
    $(a).unbind("click"), $(a).addClass("selected").siblings().each(function () {
        $(this).is(".selected") && $(this).bind("click", function () {
            changeRegionsIndicesTabContent(this, b), b ? b(this) : OnClickChartPerfHandler(this)
        }), $(this).removeClass("selected");
        var a = $(this).attr("id");
        $("#" + a + "_html").removeClass("displayBlock"), $("#" + a + "_html").addClass("displayNone")
    });
    var c = $(a).attr("id");
    $("#" + c + "_html").removeClass("displayNone"), $("#" + c + "_html").addClass("displayBlock")
}
function changeSentimentTypesTabContent(a) {
    $(a).unbind("click"), $(a).addClass("selected").siblings().each(function () {
        $(this).is(".selected") && $(this).bind("click", function () {
            changeSentimentTypesTabContent(this), OnClickSentimentsTypesHandler(this)
        }), $(this).removeClass("selected");
        var a = $(this).attr("id");
        $("#" + a + "_html").removeClass("displayBlock"), $("#" + a + "_html").addClass("displayNone")
    });
    var b = $(a).attr("id");
    $("#" + b + "_html").removeClass("displayNone"), $("#" + b + "_html").addClass("displayBlock")
}
function changeQuotesPerfTabContent(a) {
    $(a).unbind("click"), $(a).addClass("selected").siblings().each(function () {
        $(this).is(".selected") && $(this).bind("click", function () {
            changeQuotesPerfTabContent(this), OnClickQuotesPerfHandler(this)
        }), $(this).removeClass("selected");
        var a = $(this).attr("id");
        $("#" + a + "_html").removeClass("displayBlock"), $("#" + a + "_html").addClass("displayNone")
    });
    var b = $(a).attr("id");
    $("#" + b + "_html").removeClass("displayNone"), $("#" + b + "_html").addClass("displayBlock")
}
function changeChartPerfTabContent(a, b) {
    $(a).unbind("click"), $(a).addClass("selected").siblings().each(function () {
        $(this).is(".selected") && $(this).bind("click", function () {
            changeChartPerfTabContent(this, b), b ? b(this) : OnClickChartPerfHandler(this)
        }), $(this).removeClass("selected");
        var a = $(this).attr("id");
        $("#" + a + "_html").removeClass("displayBlock"), $("#" + a + "_html").addClass("displayNone")
    });
    var c = $(a).attr("id");
    $("#" + c + "_html").removeClass("displayNone"), $("#" + c + "_html").addClass("displayBlock")
}
function changeQuotesTabContent(a) {
    var b, c = $(a), d = $(".js-quotes"), e = d.find(".js-one-level-tabs");
    if (!c.hasClass("selected")) {
        e.find("li").each(function () {
            $(this).removeClass("selected dropDownTab"), $("#" + $(this).attr("id") + "_inner").addClass("displayNone")
        }), b = c.attr("id"), $("#" + b + "_inner").removeClass("displayNone"), c.hasClass("js-inner-tab") ? c.addClass("dropDownTab") : (c.addClass("selected"), e.find(".lastTab").removeClass("lastTab"));
        var f = [];
        $("#" + b + "_inner .LeftLiContainer").each(function () {
            var a = $(this), b = a.attr("pair");
            a.find("span[class^='isOpenPair'],span[class*=' isOpenPair']").length > 0 && f.push("isOpenPair-" + b + ":");
            var c = a.find("span[class^='isOpenExch'],span[class*=' isOpenExch']");
            if (c.length > 0) {
                var d = /isOpenExch[\w]*-([\d]+)/.exec(c.attr("class"));
                void 0 !== d[1] && f.push("isOpenExch-" + d[1] + ":")
            }
            f.push("pid-" + b + ":")
        }), $("#" + b + "_inner .LeftLiContainer").each(function () {
            if ($(this).is(".Selected")) {
                var a = $(this);
                pair_id = a.attr("pair"), c_link = a.attr("chart_link"), id2 = a.attr("id"), title = $("#" + id2 + " td.first a").attr("title")
            }
        }), $("#quotes_img").attr({
            src: "/charts_xml/" + pair_id + "_300_292x120_new.png?time_chart=2",
            onclick: 'chart_link("' + c_link + '");',
            title: title
        }), $(window).trigger("socketNewData", [f]), $("#quotesBoxChartWrp").trigger("chartTabChanged")
    }
}
function changeRecentQuotesTabContent(a) {
    $(a).unbind("click"), $(a).addClass("selected").siblings().each(function () {
        $(this).is(".selected") && $(this).bind("click", function () {
            changeRecentQuotesTabContent(this)
        }), $(this).removeClass("selected");
        var a = $(this).attr("id");
        $("#" + a + "_inner").removeClass("displayBlock"), $("#" + a + "_inner").addClass("displayNone")
    });
    var b = $(a).attr("id");
    switch ($("#" + b + "_inner").removeClass("displayNone"), $("#" + b + "_inner").addClass("displayBlock"), b) {
        case"tab_1":
            $.get("/common/user_quotes_block/user_quotes_sblock_data.php", {
                action: "print_page",
                sid: sid
            }, function (a) {
                $("#tab_1_inner").html(a)
            });
            break;
        case"tab_2":
            $.get("/common/portfolio/portfolio.data.php", {
                action: "getPortfolioSideBox",
                uri: uri,
                sid: sid
            }, function (a) {
                $("#tab_2_inner").html(a)
            })
    }
}
function changeReportABugTabContent(a) {
    changeMessageType($(a).attr("textId"), "toolsFooterTabReportABug_html")
}
function closeTabs(a) {
    $(a).each(function () {
        $(this).removeClass("reportABugSelected");
        var a = $(this).attr("id");
        $("#" + a + "_html").removeClass("displayBlock"), $("#" + a + "_html").addClass("displayNone")
    })
}
function showEconomicCalendarSearchResult(a) {
    if ("" == a)return void closeEconomicCalendarSearchResult();
    $("#economicCalendarSearchPopupResults").html(a);
    var b = $("#economicCalendarSearchPopupResults .row:first-child").attr("id"), c = b.substr(b.indexOf("_") + 1);
    economicCalendarSearch.setRowNumber(c), economicCalendarSearch.markRow();
    var d = ($("#" + b + " .symbolName").html(), $("#" + b + " .symbolName").attr("id"));
    pairId = d.substr(d.indexOf("_") + 1), $("#economicCalendarSearchPopupResults .row").each(function () {
        $(this).hover(function () {
            var a = $(this).attr("id"), b = a.substr(a.indexOf("_") + 1);
            economicCalendarSearch.setRowNumber(b), economicCalendarSearch.markRow();
            var c = $("#" + a + " .symbolName").html(), d = $("#" + a + " .symbolName").attr("id");
            pairId = d.substr(d.indexOf("_") + 1), economicCalendarSearch.val(c), economicCalendarSearch.unbind("blur")
        }, function () {
            searchTop.bind("blur", function () {
                economicCalendarSearch.reset(), economicCalendarSearch.closePopUp()
            })
        }).click(function () {
            searchEvent(), closeEconomicCalendarSearchResult()
        })
    }), $("#economicCalendarSearchPopupResults").addClass("displayBlock").removeClass("displayNone")
}
function closeEconomicCalendarSearchResult() {
    $("#economicCalendarSearchPopupResults").addClass("displayNone").removeClass("displayBlock").html("")
}
function sideBoxChangeChart(a, b) {
    var c = $(a).attr("tabid"), d = ($(a).attr("subtabid"), $(a).attr("pairid"));
    $("#quotes_img_" + c).attr({src: "/charts_xml/" + d + "_300_292x120_new.png?time_chart=" + b})
}
function technicalStudiesTabs(a) {
    $(a).unbind("click"), $(a).addClass("selected").siblings().each(function () {
        $(this).is(".selected") && $(this).bind("click", function () {
            technicalStudiesTabs(this), technicalStudiesData($(this).attr("pairID"), $(this).attr("tabID"), $(".JStechnicalStudiesTimeLine.selected").attr("id"))
        }), $(this).removeClass("selected")
    })
}
function technicalStudiesData(a, b, c) {
    $.get("/common/technical_studies/technical_studies_data.php", {
        action: "get_studies",
        pair_ID: a,
        tab_ID: b,
        time_frame: c
    }, function (a) {
        if (-1 != a) {
            var b = a.split("*;*");
            $("#quoteLink").html(b[0].split("=")[1]), $("#quoteLink").attr("href", b[21].split("uote_link=")[1]), $("#lastValue").html(b[1].split("=")[1]), $("#lastValue").removeClass("greenFont"), $("#lastValue").removeClass("redFont"), $("#lastValue").addClass(b[2].split("=")[1]), $("#updateTime").html(b[4].split("=")[1]), $("#tiBuy").html(b[5].split("=")[1]), $("#tiSell").html(b[6].split("=")[1]), $("#maBuy").html(b[7].split("=")[1]), $("#maSell").html(b[8].split("=")[1]), $("#sentimentsBar").html(b[22].split("=>")[1]), $("#technicalSummary").removeClass("sell"), $("#technicalSummary").removeClass("buy"), $("#technicalSummary").removeClass("neutral"), $("#technicalSummary").addClass(b[3].split("=")[1]), $("#technicalSummary").html(b[9].split("=")[1]), $("#S1").html(b[10].split("=")[1]), $("#S2").html(b[11].split("=")[1]), $("#S3").html(b[12].split("=")[1]), $("#pivot").html(b[13].split("=")[1]), $("#R1").html(b[14].split("=")[1]), $("#R2").html(b[15].split("=")[1]), $("#R3").html(b[16].split("=")[1]), $("#ppLink").attr("href", b[17].split(",")[1] + "#pivot_points_title_block"), $("#maLink").attr("href", b[17].split(",")[1] + "#moving_averages_title_block"), $("#tiLink").attr("href", b[17].split(",")[1] + "#technical_indicators_title_block"), $("#sentimentBullishPrcent").html(b[19].split("=")[1]), $("#sentimentBearishPercent").html(b[20].split("=")[1]), $(".JStechnicalStudiesTimeLine").attr("pairID", b[26].split("=")[1]);
            "" != b[27] && ($("#technicalstudiesSubTabs").html(b[27].split("=>")[1]), $("#techStudiesPairsListTabsSubMenu li")._tabs(technicalStudiesTimeLine))
        }
    })
}
function link_submit_form(a, b, c) {
    document.forms[a].elements[b].value = c, document.forms[a].submit()
}
function changeMessageType(a, b, c) {
    switch ("" != bugReportTable[b] && void 0 != bugReportTable[b] || (bugReportTable[b] = $("#" + b + " #reportABugWrapper").html()), $("#" + b + " #msgType").val(a), $("#" + b + " #comment_text").removeClass("input_error"), $("#" + b + " #reportABugBug").removeClass("reportABugSelected"), $("#" + b + " #reportABugPraise").removeClass("reportABugSelected"), $("#" + b + " #reportABugQuestion").removeClass("reportABugSelected"), $("#" + b + " #reportABugIdea").removeClass("reportABugSelected"), a) {
        case 10:
            $("#" + b + " #comment_text").val(c.bugText), $("#" + b + " #reportABugBug").addClass("reportABugSelected");
            break;
        case 11:
            $("#" + b + " #comment_text").val(c.praiseText), $("#" + b + " #reportABugPraise").addClass("reportABugSelected");
            break;
        case 12:
            $("#" + b + " #comment_text").val(c.questionText), $("#" + b + " #reportABugQuestion").addClass("reportABugSelected");
            break;
        case 13:
            $("#" + b + " #comment_text").val(c.ideaText), $("#" + b + " #reportABugIdea").addClass("reportABugSelected")
    }
}
function QuotesBlockChangeInnerTab(a) {
    var b = $(a).attr("pair"), c = $(a).attr("chart_link"), d = $(a).attr("id"), e = $("#" + d + " td.first a").attr("title");
    $(a).addClass("Selected").unbind("mouseover").siblings().each(function () {
        $(this).removeClass("Selected").unbind("mouseover").mouseover(function () {
            QuotesBlockChangeInnerTab(this)
        })
    }), $("#quotes_img").attr({
        src: "/charts_xml/" + b + "_300_292x120_new.png?time_chart=2",
        onclick: 'chart_link("' + c + '");',
        title: e
    })
}
function close_notification() {
    $("#note_container").fadeOut("fast")
}
function setEcUserRegCookies() {
    $.ajax({url: "/economic-calendar/closeBox", method: "POST", cache: !1}).done(function (a) {
    })
}
function clickEventAddComment() {
    setEcUserRegCookies(), close_notification()
}
function scroll_up_disclaimer() {
    $("html, body").animate({scrollTop: "-=108"})
}
function scroll_up_comments() {
    $("html, body").animate({scrollTop: "-=35"})
}
function changeFilterType(a, b) {
    if ("currencyExplorer" == b)return changeCurrency(a);
    if (smlID = $(a).attr("id").substr($(a).attr("id").indexOf("_") + 1), $(a).addClass("selected").siblings().each(function () {
            $(this).removeClass("selected")
        }), $(a).unbind("click").siblings().each(function () {
            $(this).unbind("click"), $(this).bind({
                click: function () {
                    changeFilterType(this, b)
                }
            })
        }), $(window).trigger("multiFilter-ChangeFilterTypeAction", [a, smlID, b]), "bond" == b)changeBondsSelectFilter("all"), $.get("/common/ajax_func.php", {
        action: "bondsFilter",
        newSml: smlID,
        maturity_from: $("#newFilter #filter_maturity_from").val(),
        maturity_to: $("#newFilter #filter_maturity_to").val(),
        continentID: $(a).attr("continentid")
    }, function (a) {
        $("#directoryFilter").html(a), changeBondsSelectFilter("all")
    }); else if ("bond indicesbonds" == b)changeBondsSelectFilter("all"), $.get("/common/ajax_func.php", {
        action: "indicesbondsFilter",
        newSml: smlID,
        continentID: $(a).attr("continentid")
    }, function (a) {
        $("#directoryFilter").html(a), changeBondsSelectFilter("all")
    }); else if ("etf" == b) {
        var c = $(a).attr("continentid");
        $.get("/common/ajax_func.php", {action: "etfsFilter", newSml: smlID, continent_id: c}, function (a) {
            $("#directoryFilter").html(a)
        })
    } else if ("central-bank" == b) {
        var c = $(a).attr("continentid");
        $.get("/common/ajax_func.php", {
            action: "worldCentralBankFilter",
            newSml: smlID,
            continent_id: c
        }, function (a) {
            $("#directoryFilter").html(a)
        })
    } else"indice" == b ? (setFilter(), $.get("/common/ajax_func.php", {
        action: "indicesFilter",
        newSml: smlID,
        majorIndices: $("#newFilter #filter_majorIndices").val(),
        additionalIndices: $("#newFilter #filter_additionalIndices").val(),
        primarySectors: $("#newFilter #filter_primarySectors").val(),
        otherIndices: $("#newFilter #filter_otherIndices").val()
    }, function (a) {
        $("#directoryFilter").html(a), setFilter()
    })) : "global" == b && (setFilter(), $.get("/common/ajax_func.php", {
        action: "globalIndicesFilter",
        newSml: smlID,
        majorIndices: $("#newFilter #filter_majorIndices").val(),
        additionalIndices: $("#newFilter #filter_additionalIndices").val(),
        primarySectors: $("#newFilter #filter_primarySectors").val(),
        otherIndices: $("#newFilter #filter_otherIndices").val(),
        bonds: $("#newFilter #filter_bonds").val(),
        commodities: $("#newFilter #filter_commodities").val()
    }, function (a) {
        $("#directoryFilter").html(a), setFilter()
    }))
}
function changeCurrency(a) {
    var b = $("#filterBoxExpTabsTop LI.selected").attr("region");
    if (!a.hasClass("selected")) {
        $("A.selected").removeClass("selected");
        var c = a.attr("continentid");
        a.addClass("selected");
        var c = a.attr("continentid");
        $("#directoryFilter").html('<img src="/images/fx_loading.gif">'), $.get("/currencies/Service/currency", {
            region_ID: b,
            currency_ID: c
        }, function (a) {
            $("#directoryFilter").empty(), $("#directoryFilter").html(a).fadeIn()
        })
    }
}
function search_world_etfs() {
    var a = $("#country").val() + "?", b = $("#asset_filter").val();
    b && 0 != b && (a += "&asset=" + b);
    var c = $("#issuer_filter :selected").val();
    c && "0" != c && (a += "&issuer_filter=" + c);
    var d = $("#etf_filter :selected").val();
    d && "0" != d && (a += "&filter=" + d), a = a.replace("?&", "?"), "?" == a.slice(-1) && (a = a.replace("?", "")), window.location = a
}
function search_world_central_banks() {
    window.location = $("#country").val()
}
function selectOptionByPreviousValue(a, b, c) {
    var d = $(a), e = d.find("option[" + b + '="' + c + '"]').index();
    return $(a)[0].selectedIndex = Math.max(0, e), Math.max(0, e)
}
function changeEtfIssuerDropdowns() {
    var a = $("#filterBoxTable A.selected").attr("continentid"), b = $("#country").find("option:selected").attr("country_id"), c = $("#issuer_filter>:selected").attr("value"), d = $("#asset_filter>:selected").attr("value");
    if (0 != $("#etf_filter").length)var e = $("#etf_filter")[0].selectedIndex, f = $("#etf_filter option:eq(" + e + ")").attr("value"); else var f = !1;
    var g = {action: "etAssetTypefsFilter", continent_id: a, country_id: b, issuer: c, asset: d, underLying: f};
    $.getJSON("/common/ajax_func.php", g, function (a) {
        var b = $("#asset_filter>:selected").attr("value");
        $("#etf_asset>select").replaceWith(a.assets), selectOptionByPreviousValue("#asset_filter", "value", b);
        var c = $("#issuer_filter>:selected").attr("value");
        $("#issuer_filter").replaceWith(a.issuers), selectOptionByPreviousValue("#issuer_filter", "value", c);
        var d = $("#country>:selected").attr("country_id");
        $("#country").replaceWith(a.countries), selectOptionByPreviousValue("#country", "country_id", d), a.underlying ? $("#hide").html(a.underlying).fadeIn() : $("#hide").html(a.underlying).hide()
    })
}
function changeFormActionWC(a) {
    if (-1 == a.indexOf("c_id"))$("#commodities_fs").show(); else {
        if ("checked" == $("input#commodities").attr("checked")) {
            1 == countFilters() && $("input#majorIndices").attr("checked", "checked")
        }
        $("input#commodities").removeAttr("checked"), $("#commodities_fs").hide()
    }
    $("#newFilter").attr("action", a)
}
function changeFormAction(a) {
    $("#newFilter").attr("action", a)
}
function changeSelected(a) {
    0 == $(".checkBox:checked").length && $(a).attr("checked", "checked"), setFilter()
}
function changeBondsSelectFilter(a) {
    $("#newFilter").empty(), "all" != a && (maturity_from_val = parseInt($("#maturity_from option:selected").val()), maturity_to_val = parseInt($("#maturity_to option:selected").val()), "from" == a ? maturity_from_val > maturity_to_val && $("#maturity_to option[value='" + maturity_from_val + "']").attr("selected", "selected") : "to" == a && maturity_to_val < maturity_from_val && $("#maturity_from option[value='" + maturity_to_val + "']").attr("selected", "selected")), $("#newFilter").append('<input name="maturity_from" value="' + $("#maturity_from option:selected").val() + '" type="hidden" id="filter_maturity_from">'), $("#newFilter").append('<input name="maturity_to" value="' + $("#maturity_to option:selected").val() + '" type="hidden" id="filter_maturity_to">')
}
function updateIndiceBondsMaturities(a, b) {
    "" == a && a < 0 && (a = 0), "" == b && b < 0 && (b = 0), $.get("/common/ajax_func.php", {
        action: "updateIndiceBondsMaturities",
        country_ID: a,
        continentID: b
    }, function (a) {
        $("#maturityContainer").html(a)
    })
}
function countFilters() {
    var a = 0;
    return $(".checkBox:checked").each(function (b, c) {
        a++
    }), a
}
function setFilter() {
    var a = 0;
    return $("#newFilter").empty(), $(".checkBox:checked").each(function (b, c) {
        $("#newFilter").append('<input name="' + $(c).attr("id") + '" value="on" type="hidden" id="filter_' + $(c).attr("id") + '">'), a += parseInt($(c).attr("checkValue"))
    }), a
}
function setCountry() {
    var a = $("#newFilter").attr("action");
    if (-1 != a.indexOf("?")) {
        var b = a.split("?"), c = b[1].split("=");
        "c_id" == c[0] ? $("#newFilter").append('<input id="c_id" name="c_id" value="' + c[1] + '" type="hidden">') : "r_id" == c[0] && $("#newFilter").append('<input id="r_id" name="r_id" value="' + c[1] + '" type="hidden">'), $("#newFilter").attr("action", b[0])
    }
}
function sendForm() {
    if (-1 == $("#newFilter").attr("action").indexOf("?")) {
        if (counter = setFilter(), 3 == counter)return void(location.href = $("#newFilter").attr("action"));
        setCountry(), $("#newFilter").submit()
    } else setFilter(), setCountry(), $("#newFilter").submit()
}
function sendBondsForm() {
    changeBondsSelectFilter("all"), $("#newFilter").submit()
}
function sendBondsAsIndiceForm() {
    changeBondsSelectFilter("all"), getIndicesBonds()
}
function getIndicesBonds() {
    var a = $(".toggled");
    a.removeClass("toggled"), execPricePerfTechButton(a, "indices", "cross_rates_container", "IndicesBonds", null, !0)
}
function OnClickSentimentsTypesHandler(a) {
    var b = a.id;
    b = b.substr(11), changeSentimentsTypesTabsContent(b, window.tradersPageType || "top_members")
}
function changeSentimentsTypesTabsContent(a, b) {
    $.get("/common/ajax_func.php", {action: "getSentimentsTypes", pair_type: a, page_name: b}, function (a) {
        $("#LeaderBoardsTableContainer").html(a)
    })
}
function getSentimentsTypesMoreResult(a, b, c, d) {
    $("#loading_img").fadeToggle(), $(".showMoreCommentsLoading").fadeToggle(), $(".paginationGetMoreCenter").fadeToggle(), numOfPages = parseInt(d) / 10, $.get("/common/ajax_func.php", {
        action: "getSentimentsTypes",
        pair_type: a,
        page_name: c,
        page: b,
        moreResult: !0
    }, function (e) {
        "" == e ? $("#paginationGetMore").hide() : (setTimeout(function () {
            $(".showMoreCommentsLoading").fadeToggle(), $("#LeaderBoardsTableContainer table tbody").append(e)
        }, 500), b = parseInt(b) + 1, b >= numOfPages ? $("#paginationGetMore").hide() : $("#paginationGetMore a").attr("onclick", "getSentimentsTypesMoreResult('" + a + "'," + b + ",'" + c + "','" + d + "')"))
    })
}
function hit_news_item(a, b, c) {
    $.ajax({
        url: "/news/Service/ExtContent",
        type: "get",
        data: {item: a, contentType: b}
    }), c && (ga("allSitesTracker.set", "dimension47", c), ga("allSitesTracker.set", "metric15", "1"), ga("allSitesTracker.send", "pageview"))
}
document.pairId = 0, document.searchCurrentId = "", FXSearch.prototype = {
    rowNumber: 0,
    lastRowNumber: 1,
    searchText: "",
    allowdReset: !0,
    allowdClosePopUp: !0,
    allowdKeys: !1,
    allowdForm: !1,
    searchDeafaultVale: "",
    searchTimeOutRunning: !1,
    arrowfocus: "",
    all_searchText: "",
    current_tab: "All",
    cameFromSwitch: !1,
    getRowsNumber: function () {
        return $(".searchPopupResults .row").length
    },
    setRowNumber: function (a) {
        searchSelf.allowdForm = !0, this.lastRowNumber = searchSelf.rowNumber, searchSelf.rowNumber = a
    },
    selectedRow: function () {
        return $("#searchRowId_" + searchSelf.rowNumber + "_" + searchSelf.current_tab)
    },
    allowdForm: function () {
        return searchSelf.allowdForm
    },
    lastSelectedRow: function () {
        return $("#searchRowId_" + searchSelf.lastRowNumber + "_" + searchSelf.current_tab)
    },
    clear: function (a) {
        "" == searchSelf.searchDeafaultVale && (searchSelf.searchDeafaultVale = $(a).val()), searchSelf.searchDeafaultVale == $(a).val() && (document.getElementById(this.Element.searchTextId).value = "", searchSelf.allowdReset = !0, searchSelf.allowdKeys = !1, searchSelf.allowdForm = !1, searchSelf.rowNumber = searchSelf.defaultRowNumber)
    },
    reset: function (a) {
        searchSelf.allowdReset && $(a).val(searchSelf.searchDeafaultVale)
    },
    closePopUp: function () {
        searchSelf.allowdClosePopUp && searchSelf.closeSearchResult.call(this)
    },
    updateAddToPortfolio: function (a) {
        "Portfolio" == a.Element.searchType && (selectedRow = searchSelf.selectedRow(), pid = $("td:first", selectedRow).attr("pairid"), document.pairId = pid, $("#" + a.Element.formElementId).attr("onsubmit", "addToPortfolio(" + pid + "," + a.Element.portfolioId + "); return false;"))
    },
    keyUpDown: function (a, b) {
        searchSelf.allowdForm = !0, searchSelf.lastRowNumber = searchSelf.rowNumber;
        var c = !1, d = $("#total_results" + document.searchCurrentId).html();
        searchSelf.searchText;
        if (40 == a.keyCode)void 0 === searchSelf.rowNumber && (searchSelf.rowNumber = 0), searchSelf.rowNumber++, isNaN(searchSelf.rowNumber) && (searchSelf.arrowfocus = "tabs"), searchSelf.rowNumber > 7 ? document.getElementById("top_search_box_div" + document.searchCurrentId + "_" + searchSelf.current_tab).scrollTop += 22 : $("#top_search_box_div" + document.searchCurrentId + "_" + searchSelf.current_tab).scrollTop(0); else if (38 == a.keyCode)searchSelf.rowNumber--, (0 == searchSelf.rowNumber || isNaN(searchSelf.rowNumber)) && ($("#" + this.Element.formElementId).attr("onsubmit", "return false;"), searchSelf.arrowfocus = "text", c = !0, $("#" + this.Element.searchTextId).focus(), $("#" + this.Element.searchTextId).val(searchSelf.searchText), searchSelf.allowdKeys = !0), d - searchSelf.rowNumber > 7 && (document.getElementById("top_search_box_div" + document.searchCurrentId + "_" + searchSelf.current_tab).scrollTop -= 22); else if (39 == a.keyCode && "tabs" == searchSelf.arrowfocus && "searchDirectoryPopupResults" != document.searchCurrentId) {
            $("#" + this.Element.formElementId).attr("onsubmit", "searchSelf.allowdForm;");
            var e = side_arrows("right", searchSelf.current_tab);
            searchSelf.OnClickSearchBoxTab.call(this, e)
        } else if (37 == a.keyCode && "tabs" == searchSelf.arrowfocus && "searchDirectoryPopupResults" != document.searchCurrentId) {
            $("#" + this.Element.formElementId).attr("onsubmit", "searchSelf.allowdForm;");
            var e = side_arrows("left", searchSelf.current_tab);
            searchSelf.OnClickSearchBoxTab.call(this, e)
        }
        if (0 == $("#searchRowId_" + searchSelf.rowNumber + "_" + searchSelf.current_tab).length)return c ? (searchSelf.rowNumber = 0, void $(".searchPopupResults .row").removeClass("hoverSearch")) : void(searchSelf.rowNumber = searchSelf.lastRowNumber);
        searchSelf.markRow.call(this, this), searchSelf.updateAddToPortfolio(this)
    },
    markRow: function (a) {
        $(".searchPopupResults .row").removeClass("hoverSearch"), $("#" + a.Element.searchPopupResultsId + " #searchRowId_" + searchSelf.rowNumber + "_" + searchSelf.current_tab).addClass("hoverSearch")
    },
    autoComplite: function (a, b) {
        38 != a.keyCode && 40 != a.keyCode && 37 != a.keyCode && 39 != a.keyCode && (searchSelf.searchText = $(b).val()), searchSelf.searchText.length > 0 && (38 == a.keyCode || 40 == a.keyCode || 37 == a.keyCode || 39 == a.keyCode) && searchSelf.allowdKeys ? searchSelf.keyUpDown.call(this, a) : 0 == searchSelf.searchText.length ? (searchSelf.closePopUp.call(this), searchSelf.allowdReset = !0, searchSelf.rowNumber = searchSelf.defaultRowNumber) : 13 != a.keyCode && searchSelf.searchText.length >= this.Element.minimumChar && !searchSelf.searchTimeOutRunning && (searchSelf.allowdReset = !1, searchSelf.executeAutoCompleteTimeout.call(this))
    },
    executeAutoCompleteTimeout: function () {
        var a = this;
        searchSelf.searchTimeOutRunning || (searchSelf.searchTimeOutRunning = !0, a.timer = setTimeout(function () {
            searchSelf.executeAutoComplete.call(a)
        }, 500))
    },
    executeAutoComplete: function () {
        searchSelf.allowdForm = !1;
        var a = this, b = $("#prev_tab" + document.searchCurrentId).val(), c = $("#selected_country_id" + document.searchCurrentId).html();
        "" == c && (c = 0), $.get(this.Element.url, {
            action: "get_auto_complete",
            search_text: searchSelf.searchText,
            current_tab_id: b,
            country_id: c,
            parameter: this.Element.parameter,
            userType: this.Element.userType,
            userSupportedType: this.Element.userSupportedType,
            search_id: document.searchCurrentId
        }, function (b) {
            searchSelf.allowdKeys = !1, searchSelf.allowdForm = !1, "" != b && (searchSelf.allowdKeys = !0, searchSelf.arrowfocus = "text"), searchSelf.showSearchResult.call(a, b)
        }), $("#selected_country_id" + document.searchCurrentId).html(c), "" == searchSelf.all_searchText && (searchSelf.all_searchText = searchSelf.searchText), "All" != searchSelf.current_tab ? searchSelf.all_searchText = "" : searchSelf.all_searchText = searchSelf.searchText, changeSearchTabContent("li#search_box_" + b), searchSelf.searchTimeOutRunning = !1
    },
    searchBehavior: function (a, b, c, d) {
        "Portfolio" == this.Element.searchType && (document.pairId = $("td:first", b).attr("pairid")), a = a.replace(/<\/\i>/g, ""), a = a.replace(/<i class="bold">/g, ""), a = a.replace(/<\/\I>/g, ""), a = a.replace(/<I class=bold>/g, ""), a = a.replace(/<\/\i>/g, ""), a = a.replace(/<\/\i>/g, ""), 1 != d && $(c).val(a), "Portfolio" != this.Element.searchType && $("#" + this.Element.formElementId).attr("action", $("#" + b.attr("id") + " .symbolName").attr("link"))
    },
    searchBinder: function (a) {
        var b, c = this;
        searchSelf.searchDeafaultVale = $("#searchTextTop").val(), a.bind("focus", function () {
            searchSelf.clear.call(c, a), $("#searchDirectoryPopupResults").addClass("displayNone").removeClass("displayBlock").html(""), document.searchCurrentId = c.Element.searchPopupResultsId
        }), a.bind("click", function () {
            searchSelf.arrowfocus = "text", searchSelf.rowNumber = "0", $(".searchPopupResults .row").removeClass("hoverSearch")
        }), a.bind("keyup", function (d) {
            38 != d.keyCode && 40 != d.keyCode && "searchDirectoryPopupResults" != document.searchCurrentId && $("#" + c.Element.formElementId).attr("onsubmit", "return false;"), searchSelf.autoComplite.call(c, d, a), selectedRow = searchSelf.selectedRow();
            var e = $("#total_results" + document.searchCurrentId).html()
