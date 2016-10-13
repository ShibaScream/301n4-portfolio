var blogController=function(){"use strict";var l={};return l.show=function(l,a){blogView.initPage(l.articles)},l.loadAll=function(l,a){var t=function(){l.articles=blogData.all,a()};blogData.all.length?(l.articles=blogData.all,a()):blogData.fetchAll(t)},l}();
var blogData=function(){"use strict";function t(t){this.title=t.title,this.language=t.language,this.category=t.category,this.author=t.author,this.authorUrl=t.authorUrl,this.publishedOn=t.publishedOn,this.body=t.body}return t.all=[],t.loadAll=function(a){this.all=a.sort(function(t,a){return new Date(a.publishedOn)-new Date(t.publishedOn)}).map(function(a){return new t(a)})},t.fetchAll=function(a){localStorage.articleData&&"undefined"!==localStorage.articleData?(this.loadAll(JSON.parse(localStorage.articleData)),a()):$.getJSON("../data/articleData.json",function(l){t.loadAll(l),localStorage.setItem("articleData",JSON.stringify(t.all)),a()}).fail(function(t,a){console.error("Blog failed to load. Error: ",a)})},t}();
var blogView=function(){"use strict";var e={templateScript:$("#portfolioTemplate").html(),theTemplate:null};return e.setTeasers=function(){$(".article-body *:nth-of-type(n+2)").hide();var e=$("#projects");e.on("click","a.read-on",function(e){e.preventDefault(),$(this).parent().find("*").fadeIn(),$(this).hide(),$(this).parent().find("a.read-less").show()}),e.on("click","a.read-less",function(e){e.preventDefault(),$(".article-body *:nth-of-type(n+2)").hide(),$(this).hide(),$(this).parent().find("a.read-on").show()})},e.toHTML=function(t){return t.daysAgo=parseInt((new Date-new Date(t.publishedOn))/60/60/24/1e3,10),t.publishStatus=t.publishedOn?"published "+t.daysAgo+" days ago":"(draft)",this.theTemplate=Handlebars.compile(e.templateScript),this.theTemplate(t)},e.initPage=function(t){$(".section-view").hide();var n=$("#projects");n.empty(),t.forEach(function(t){n.append(e.toHTML(t))}),e.setTeasers(),hljs.initHighlightingOnLoad(),n.show()},e}();
var contactController=function(){"use strict";var t={};return t.show=function(){$(".section-view").hide(),$("#contact").show()},t}();
var indexController=function(){"use strict";var e={};return e.show=function(){$(".section-view").hide(),$("#home").show(),repos.requestRepos(reposView.index)},e}();
!function(){"use strict";var e={};e.toggleMobileMenu=function(){var e=$("#menu"),i=$("#mobilemenu");i.on("click",function(){e.find("ul").fadeToggle("fast")}),e.on("click",function(){"block"===i.css("display")&&e.find("ul").fadeToggle("fast")})},e.hideMobileMenu=function(){$("#menu").find("ul").fadeOut("fast")},e.checkSize=function(){"block"===$("#mobilemenu").css("display")?$("main").on("click",e.hideMobileMenu):$("main").off("click",e.hideMobileMenu)},$(document).ready(function(){e.toggleMobileMenu(),e.checkSize(),$(window).resize(_.debounce(e.checkSize,500))})}();
var repos=function(){"use strict";var e={};return e.all=[],e.requestRepos=function(r){$.ajax({url:"/github/users/ShibaScream/repos?per_page=100&sort=updated",type:"GET",success:function(r,t,u){e.all=r}}).done(r)},e.with=function(r){return e.all.filter(function(e){return e[r]})},e}();
var reposView=function(){"use strict";var e={},t=Handlebars.compile($("#repo-template").html());return e.index=function(){var e=$("#github");e.empty(),e.append(repos.with("name").map(t))},e}();
var resumeController=function(){"use strict";var e={};return e.show=function(e,a){resumeView.initPage(e.jobs)},e.loadAll=function(e,a){resumeData.all.length?(e.jobs=resumeData.all,a()):resumeData.fetchAll(resumeData)},e}();
var resumeData=function(){"use strict";function t(t){this.title=t.title,this.company=t.company,this.companyURL=t.companyURL,this.companyLogo=t.companyLogo,this.dateFrom=t.dateFrom,this.dateTo=t.dateTo,this.description=t.description}return t.all=[],t.loadAll=function(a){this.all=a.sort(function(t,a){return new Date(a.dateFrom)-new Date(t.dateFrom)}).map(function(a){return new t(a)})},t.fetchAll=function(a){localStorage.resumeData&&"undefined"!==localStorage.resumeData?(this.loadAll(JSON.parse(localStorage.resumeData)),a()):$.getJSON("/../data/resumeData.json",function(e){t.loadAll(e),localStorage.setItem("resumeData",JSON.stringify(t.all)),a()}).fail(function(t,a,e){console.error("Resume failed to load. Error: ",a)})},t}();
var resumeView=function(){"use strict";var e={templateScript:$("#resumeTemplate").html(),theTemplate:null};return e.toHTML=function(t){return this.theTemplate=Handlebars.compile(e.templateScript),this.theTemplate(t)},e.initPage=function(t){$(".section-view").hide();var i=$("#resume");i.empty(),t.forEach(function(t){i.append(e.toHTML(t))}),i.show()},e}();
page("/",indexController.show),page("/projects",blogController.loadAll,blogController.show),page("/resume",resumeController.loadAll,resumeController.show),page("/contact",contactController.show),page("*",function(){console.error("This should be a 404 Error Page")}),page();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2dDb250cm9sbGVyLmpzIiwiYmxvZ0RhdGEuanMiLCJibG9nVmlldy5qcyIsImNvbnRhY3RDb250cm9sbGVyLmpzIiwiaW5kZXhDb250cm9sbGVyLmpzIiwibWVudUhhbmRsZXIuanMiLCJyZXBvcy5qcyIsInJlcG9zVmlldy5qcyIsInJlc3VtZUNvbnRyb2xsZXIuanMiLCJyZXN1bWVEYXRhLmpzIiwicmVzdW1lVmlldy5qcyIsInJvdXRlcy5qcyJdLCJuYW1lcyI6WyJibG9nQ29udHJvbGxlciIsImNvbnRyb2xsZXIiLCJzaG93IiwiY3R4IiwibmV4dCIsImJsb2dWaWV3IiwiaW5pdFBhZ2UiLCJhcnRpY2xlcyIsImxvYWRBbGwiLCJsb2FkQXJ0aWNsZXMiLCJibG9nRGF0YSIsImFsbCIsImxlbmd0aCIsImZldGNoQWxsIiwiQXJ0aWNsZSIsIm9wdHMiLCJ0aGlzIiwidGl0bGUiLCJsYW5ndWFnZSIsImNhdGVnb3J5IiwiYXV0aG9yIiwiYXV0aG9yVXJsIiwicHVibGlzaGVkT24iLCJib2R5IiwiZGF0YSIsInNvcnQiLCJhIiwiYiIsIkRhdGUiLCJtYXAiLCJhcnRpY2xlIiwiY2FsbGJhY2siLCJsb2NhbFN0b3JhZ2UiLCJhcnRpY2xlRGF0YSIsIkpTT04iLCJwYXJzZSIsIiQiLCJnZXRKU09OIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImZhaWwiLCJ4IiwidGV4dFN0YXR1cyIsImNvbnNvbGUiLCJlcnJvciIsInZpZXciLCJ0ZW1wbGF0ZVNjcmlwdCIsImh0bWwiLCJ0aGVUZW1wbGF0ZSIsInNldFRlYXNlcnMiLCJoaWRlIiwiJHByb2plY3RzIiwib24iLCJlIiwicHJldmVudERlZmF1bHQiLCJwYXJlbnQiLCJmaW5kIiwiZmFkZUluIiwidG9IVE1MIiwiZGF5c0FnbyIsInBhcnNlSW50IiwicHVibGlzaFN0YXR1cyIsIkhhbmRsZWJhcnMiLCJjb21waWxlIiwiZW1wdHkiLCJmb3JFYWNoIiwiYXBwZW5kIiwiaGxqcyIsImluaXRIaWdobGlnaHRpbmdPbkxvYWQiLCJjb250YWN0Q29udHJvbGxlciIsImluZGV4Q29udHJvbGxlciIsInJlcG9zIiwicmVxdWVzdFJlcG9zIiwicmVwb3NWaWV3IiwiaW5kZXgiLCJtZW51VmlldyIsInRvZ2dsZU1vYmlsZU1lbnUiLCIkbWVudSIsIiRtb2JpbGVtZW51IiwiZmFkZVRvZ2dsZSIsImNzcyIsImhpZGVNb2JpbGVNZW51IiwiZmFkZU91dCIsImNoZWNrU2l6ZSIsIm9mZiIsImRvY3VtZW50IiwicmVhZHkiLCJ3aW5kb3ciLCJyZXNpemUiLCJfIiwiZGVib3VuY2UiLCJhamF4IiwidXJsIiwidHlwZSIsInN1Y2Nlc3MiLCJtZXNzYWdlIiwieGhyIiwiZG9uZSIsIndpdGgiLCJhdHRyIiwiZmlsdGVyIiwicmVwbyIsInJlcG9WaWV3IiwicmVuZGVyIiwiJGdpdGh1YiIsInJlc3VtZUNvbnRyb2xsZXIiLCJyZXN1bWVWaWV3Iiwiam9icyIsInJlc3VtZURhdGEiLCJKb2IiLCJjb21wYW55IiwiY29tcGFueVVSTCIsImNvbXBhbnlMb2dvIiwiZGF0ZUZyb20iLCJkYXRlVG8iLCJkZXNjcmlwdGlvbiIsIml0ZW0iLCJ5Iiwiam9iIiwiJHJlc3VtZSIsInBhZ2UiXSwibWFwcGluZ3MiOiJBQUFBLEdBQUlBLGdCQUFrQixXQUNwQixZQUVBLElBQUlDLEtBd0JKLE9BdEJBQSxHQUFXQyxLQUFPLFNBQVVDLEVBQUtDLEdBSS9CQyxTQUFTQyxTQUFTSCxFQUFJSSxXQUd4Qk4sRUFBV08sUUFBVSxTQUFVTCxFQUFLQyxHQUNsQyxHQUFJSyxHQUFlLFdBQ2pCTixFQUFJSSxTQUFXRyxTQUFTQyxJQUN4QlAsSUFHRU0sVUFBU0MsSUFBSUMsUUFDZlQsRUFBSUksU0FBV0csU0FBU0MsSUFDeEJQLEtBRUFNLFNBQVNHLFNBQVNKLElBS2ZSO0FDM0JULEdBQUlTLFVBQVksV0FDZCxZQUdBLFNBQVNJLEdBQVFDLEdBQ2ZDLEtBQUtDLE1BQVFGLEVBQUtFLE1BQ2xCRCxLQUFLRSxTQUFXSCxFQUFLRyxTQUNyQkYsS0FBS0csU0FB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QVMsU0FBVTRELEdBSXRCLE1BRkF0RyxNQUFLZ0MsWUFBY2MsV0FBV0MsUUFBUWxCLEVBQUtDLGdCQUVwQzlCLEtBQUtnQyxZQUFZc0UsSUFJMUJ6RSxFQUFLdkMsU0FBVyxTQUFVcUcsR0FDeEJ2RSxFQUFFLGlCQUFpQmMsTUFFbkIsSUFBSXFFLEdBQVVuRixFQUFFLFVBRWhCbUYsR0FBUXZELFFBRVIyQyxFQUFLMUMsUUFBUSxTQUFVcUQsR0FDckJDLEVBQVFyRCxPQUFPckIsRUFBS2EsT0FBTzRELE1BRzdCQyxFQUFRckgsUUFJSDJDO0FDL0JUMkUsS0FBSyxJQUFLbEQsZ0JBQWdCcEUsTUFDMUJzSCxLQUFLLFlBQWF4SCxlQUFlUSxRQUFTUixlQUFlRSxNQUN6RHNILEtBQUssVUFBV2YsaUJBQWlCakcsUUFBU2lHLGlCQUFpQnZHLE1BQzNEc0gsS0FBSyxXQUFZbkQsa0JBQWtCbkUsTUFHbkNzSCxLQUFLLElBQUssV0FDUjdFLFFBQVFDLE1BQU0scUNBR2hCNEUiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBibG9nQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgY29udHJvbGxlciA9IHt9O1xuXG4gIGNvbnRyb2xsZXIuc2hvdyA9IGZ1bmN0aW9uIChjdHgsIG5leHQpIHtcbiAgICAvLyBibG9nRGF0YS5mZXRjaEFsbChibG9nVmlldy5pbml0UGFnZSk7XG4gICAgLy8gJCgnLnNlY3Rpb24tdmlldycpLmhpZGUoKTtcbiAgICAvLyAkKCcjcHJvamVjdHMnKS5zaG93KCk7XG4gICAgYmxvZ1ZpZXcuaW5pdFBhZ2UoY3R4LmFydGljbGVzKTtcbiAgfTtcblxuICBjb250cm9sbGVyLmxvYWRBbGwgPSBmdW5jdGlvbiAoY3R4LCBuZXh0KSB7XG4gICAgdmFyIGxvYWRBcnRpY2xlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGN0eC5hcnRpY2xlcyA9IGJsb2dEYXRhLmFsbDtcbiAgICAgIG5leHQoKTtcbiAgICB9O1xuXG4gICAgaWYgKGJsb2dEYXRhLmFsbC5sZW5ndGgpIHtcbiAgICAgIGN0eC5hcnRpY2xlcyA9IGJsb2dEYXRhLmFsbDtcbiAgICAgIG5leHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYmxvZ0RhdGEuZmV0Y2hBbGwobG9hZEFydGljbGVzKTtcbiAgICB9XG5cbiAgfTtcblxuICByZXR1cm4gY29udHJvbGxlcjtcblxufSgpKTtcbiIsInZhciBibG9nRGF0YSA9IChmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBBcnRpY2xlIGNvbnN0cnVjdG9yIC0gZm9yIGxvYWRpbmcgSlNPTiBkYXRhIGludG8gYXJ0aWNsZSBvYmplY3RzXG4gIGZ1bmN0aW9uIEFydGljbGUob3B0cykge1xuICAgIHRoaXMudGl0bGUgPSBvcHRzLnRpdGxlO1xuICAgIHRoaXMubGFuZ3VhZ2UgPSBvcHRzLmxhbmd1YWdlO1xuICAgIHRoaXMuY2F0ZWdvcnkgPSBvcHRzLmNhdGVnb3J5O1xuICAgIHRoaXMuYXV0aG9yID0gb3B0cy5hdXRob3I7XG4gICAgdGhpcy5hdXRob3JVcmwgPSBvcHRzLmF1dGhvclVybDtcbiAgICB0aGlzLnB1Ymxpc2hlZE9uID0gb3B0cy5wdWJsaXNoZWRPbjtcbiAgICB0aGlzLmJvZHkgPSBvcHRzLmJvZHk7XG4gIH1cblxuICAvLyBtb3ZpbmcgdGhlIGFydGljbGVzIHZhcmlhYmxlIG91dCBvZiB0aGUgZ2xvYmFsIG5hbWVzcGFjZVxuICBBcnRpY2xlLmFsbCA9IFtdO1xuXG4gIEFydGljbGUubG9hZEFsbCA9IGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICB0aGlzLmFsbCA9IGRhdGFcbiAgICAgIC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiAobmV3IERhdGUoYi5wdWJsaXNoZWRPbikpIC0gKG5ldyBEYXRlKGEucHVibGlzaGVkT24pKTtcbiAgICAgIH0pXG4gICAgICAubWFwKGZ1bmN0aW9uIChhcnRpY2xlKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXJ0aWNsZShhcnRpY2xlKTtcbiAgICAgIH0pO1xuXG4gIH07XG5cbiAgQXJ0aWNsZS5mZXRjaEFsbCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5hcnRpY2xlRGF0YSAmJiBsb2NhbFN0b3JhZ2UuYXJ0aWNsZURhdGEgIT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgIHRoaXMubG9hZEFsbChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5hcnRpY2xlRGF0YSkpO1xuICAgICAgY2FsbGJhY2soKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgICQuZ2V0SlNPTignLi4vZGF0YS9hcnRpY2xlRGF0YS5qc29uJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgQXJ0aWNsZS5sb2FkQWxsKGRhdGEpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYXJ0aWNsZURhdGEnLCBKU09OLnN0cmluZ2lmeShBcnRpY2xlLmFsbCkpO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSkuZmFpbChmdW5jdGlvbiAoeCwgdGV4dFN0YXR1cykge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdCbG9nIGZhaWxlZCB0byBsb2FkLiBFcnJvcjogJywgdGV4dFN0YXR1cyk7XG4gICAgICB9KTtcblxuICAgIH1cblxuICB9O1xuICAvLyBhdHRhY2hpbmcgdG8gRE9NXG4gIHJldHVybiBBcnRpY2xlO1xuXG59KCkpO1xuIiwidmFyIGJsb2dWaWV3ID0gKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB2aWV3ID0ge1xuICAgIHRlbXBsYXRlU2NyaXB0OiAkKCcjcG9ydGZvbGlvVGVtcGxhdGUnKS5odG1sKCksXG4gICAgdGhlVGVtcGxhdGU6IG51bGxcbiAgfTtcblxuICB2aWV3LnNldFRlYXNlcnMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAvLyBIaWRlIGVsZW1lbnRzIGJleW9uZCB0aGUgZmlyc3QgMiBpbiBhbnkgYXJ0aWNsZSBib2R5LlxuICAgICQoJy5hcnRpY2xlLWJvZHkgKjpudGgtb2YtdHlwZShuKzIpJykuaGlkZSgpO1xuXG4gICAgdmFyICRwcm9qZWN0cyA9ICQoJyNwcm9qZWN0cycpO1xuXG4gICAgJHByb2plY3RzLm9uKCdjbGljaycsICdhLnJlYWQtb24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcqJykuZmFkZUluKCk7XG4gICAgICAkKHRoaXMpLmhpZGUoKTtcbiAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnYS5yZWFkLWxlc3MnKS5zaG93KCk7XG4gICAgfSk7XG5cbiAgICAkcHJvamVjdHMub24oJ2NsaWNrJywgJ2EucmVhZC1sZXNzJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQoJy5hcnRpY2xlLWJvZHkgKjpudGgtb2YtdHlwZShuKzIpJykuaGlkZSgpO1xuICAgICAgJCh0aGlzKS5oaWRlKCk7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2EucmVhZC1vbicpLnNob3coKTtcbiAgICB9KTtcblxuICB9O1xuXG4gIHZpZXcudG9IVE1MID0gZnVuY3Rpb24gKGFydGljbGUpIHtcblxuICAgIC8vIHdoZXJlIHNob3VsZCB0aGlzIGxvZ2ljIGV4aXN0cz8gU2VlbXMgaW5jb3JyZWN0IHRvIGhhdmUgaXQgaW4gdmlld1xuICAgIGFydGljbGUuZGF5c0FnbyA9IHBhcnNlSW50KChuZXcgRGF0ZSgpIC0gbmV3IERhdGUoYXJ0aWNsZS5wdWJsaXNoZWRPbikpIC8gNjAgLyA2MCAvIDI0IC8gMTAwMCwgMTApO1xuICAgIGFydGljbGUucHVibGlzaFN0YXR1cyA9IGFydGljbGUucHVibGlzaGVkT24gPyAncHVibGlzaGVkICcgKyBhcnRpY2xlLmRheXNBZ28gKyAnIGRheXMgYWdvJyA6ICcoZHJhZnQpJztcblxuICAgIHRoaXMudGhlVGVtcGxhdGUgPSBIYW5kbGViYXJzLmNvbXBpbGUodmlldy50ZW1wbGF0ZVNjcmlwdCk7XG5cbiAgICByZXR1cm4gdGhpcy50aGVUZW1wbGF0ZShhcnRpY2xlKTtcblxuICB9O1xuXG5cbiAgdmlldy5pbml0UGFnZSA9IGZ1bmN0aW9uIChhcnRpY2xlcykge1xuICAgICQoJy5zZWN0aW9uLXZpZXcnKS5oaWRlKCk7XG5cbiAgICB2YXIgJHByb2plY3RzID0gJCgnI3Byb2plY3RzJyk7XG5cbiAgICAkcHJvamVjdHMuZW1wdHkoKTtcblxuICAgIGFydGljbGVzLmZvckVhY2goZnVuY3Rpb24gKGFydGljbGUpIHtcbiAgICAgICRwcm9qZWN0cy5hcHBlbmQodmlldy50b0hUTUwoYXJ0aWNsZSkpO1xuICAgIH0pO1xuXG4gICAgdmlldy5zZXRUZWFzZXJzKCk7XG5cbiAgICBobGpzLmluaXRIaWdobGlnaHRpbmdPbkxvYWQoKTtcblxuICAgICRwcm9qZWN0cy5zaG93KCk7XG4gIH07XG5cbiAgcmV0dXJuIHZpZXc7XG5cbn0oKSk7XG4iLCJ2YXIgY29udGFjdENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGNvbnRyb2xsZXIgPSB7fTtcblxuICBjb250cm9sbGVyLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgJCgnLnNlY3Rpb24tdmlldycpLmhpZGUoKTtcbiAgICAkKCcjY29udGFjdCcpLnNob3coKTtcbiAgfTtcblxuICByZXR1cm4gY29udHJvbGxlcjtcblxufSgpKTtcbiIsInZhciBpbmRleENvbnRyb2xsZXIgPSAoZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIGNvbnRyb2xsZXIgPSB7fTtcblxuICBjb250cm9sbGVyLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgJCgnLnNlY3Rpb24tdmlldycpLmhpZGUoKTtcbiAgICAkKCcjaG9tZScpLnNob3coKTtcbiAgICByZXBvcy5yZXF1ZXN0UmVwb3MocmVwb3NWaWV3LmluZGV4KTtcbiAgfTtcblxuICByZXR1cm4gY29udHJvbGxlcjtcblxufSgpKTtcbiIsIihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbWVudVZpZXcgPSB7fTtcblxuICBtZW51Vmlldy50b2dnbGVNb2JpbGVNZW51ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyICRtZW51ID0gJCgnI21lbnUnKTtcbiAgICB2YXIgJG1vYmlsZW1lbnUgPSAkKCcjbW9iaWxlbWVudScpO1xuXG4gICAgJG1vYmlsZW1lbnUub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgJG1lbnUuZmluZCgndWwnKS5mYWRlVG9nZ2xlKCdmYXN0Jyk7XG4gICAgfSk7XG5cbiAgICAkbWVudS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoJG1vYmlsZW1lbnUuY3NzKCdkaXNwbGF5JykgPT09ICdibG9jaycpIHtcbiAgICAgICAgJG1lbnUuZmluZCgndWwnKS5mYWRlVG9nZ2xlKCdmYXN0Jyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgbWVudVZpZXcuaGlkZU1vYmlsZU1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgJCgnI21lbnUnKS5maW5kKCd1bCcpLmZhZGVPdXQoJ2Zhc3QnKTtcbiAgfTtcblxuICAvKioqKlxuICAgIGNyZWRpdCB0byBodHRwczovL3d3dy5mb3VyZnJvbnQudXMvYmxvZy9qcXVlcnktd2luZG93LXdpZHRoLWFuZC1tZWRpYS1xdWVyaWVzXG4gICAgZm91bmQgd2F5IHRvIGNoZWNrIGlmIGluIG1vYmlsZSB2ZXJzaW9uIG9mIHNpdGVcbiAgICBvbmx5IHRoZW4sIGF0dGFjaCBldmVudCBsaXN0ZW5lciB0byBtYWluIHNvIGlmIGEgdXNlciBjbGlja3MgaXQgaGlkZXMgbWVudVxuICAgIGNvbnNpZGVyIGFkZGluZyB1bmRlcnNjb3JlLmpzIGxpYnJhcnkgYW5kIF9fZGVib3VuY2UgbWV0aG9kIHRvIGhvbGQgb2ZmIG9uIGZpcmluZ1xuICAgIGZ1bmN0aW9uIHVudGlsIHJlc2l6ZSBpcyBjb21wbGV0ZWRcbiAgKioqKiovXG4gIG1lbnVWaWV3LmNoZWNrU2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoJCgnI21vYmlsZW1lbnUnKS5jc3MoJ2Rpc3BsYXknKSA9PT0gJ2Jsb2NrJykge1xuICAgICAgJCgnbWFpbicpLm9uKCdjbGljaycsIG1lbnVWaWV3LmhpZGVNb2JpbGVNZW51KTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnbWFpbicpLm9mZignY2xpY2snLCBtZW51Vmlldy5oaWRlTW9iaWxlTWVudSk7XG4gICAgfVxuICB9O1xuXG4gICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICBtZW51Vmlldy50b2dnbGVNb2JpbGVNZW51KCk7XG4gICAgLy8gZmlyZSB0aGUgZmlyc3QgdGltZVxuICAgIG1lbnVWaWV3LmNoZWNrU2l6ZSgpO1xuICAgIC8vIGNoZWNrIGFnYWluIG9uIHJlc2l6ZSwgdXNpbmcgZGVib3VuY2UgdG8gYXZvaWQgbXVsdGlwbGUgZmlyaW5nc1xuICAgICQod2luZG93KS5yZXNpemUoXy5kZWJvdW5jZShtZW51Vmlldy5jaGVja1NpemUsIDUwMCkpO1xuICB9KTtcblxufSgpKTtcbiIsInZhciByZXBvcyA9IChmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciByZXBvcyA9IHt9O1xuXG4gIHJlcG9zLmFsbCA9IFtdO1xuXG4gIHJlcG9zLnJlcXVlc3RSZXBvcyA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9naXRodWIvdXNlcnMvU2hpYmFTY3JlYW0vcmVwb3M/cGVyX3BhZ2U9MTAwJnNvcnQ9dXBkYXRlZCcsXG4gICAgICB0eXBlOiAnR0VUJyxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEsIG1lc3NhZ2UsIHhocikge1xuICAgICAgICByZXBvcy5hbGwgPSBkYXRhO1xuICAgICAgfVxuICAgIH0pLmRvbmUoY2FsbGJhY2spO1xuICB9O1xuXG4gIHJlcG9zLndpdGggPSBmdW5jdGlvbihhdHRyKSB7XG4gICAgcmV0dXJuIHJlcG9zLmFsbC5maWx0ZXIoZnVuY3Rpb24ocmVwbykge1xuICAgICAgcmV0dXJuIHJlcG9bYXR0cl07XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHJlcG9zO1xufSkoKTtcbiIsInZhciByZXBvc1ZpZXcgPSAoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgcmVwb1ZpZXcgPSB7fTtcblxuICB2YXIgcmVuZGVyID0gSGFuZGxlYmFycy5jb21waWxlKCQoJyNyZXBvLXRlbXBsYXRlJykuaHRtbCgpKTtcblxuICByZXBvVmlldy5pbmRleCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkZ2l0aHViID0gJCgnI2dpdGh1YicpO1xuXG4gICAgJGdpdGh1Yi5lbXB0eSgpO1xuXG4gICAgJGdpdGh1Yi5hcHBlbmQoXG4gICAgICByZXBvcy53aXRoKCduYW1lJykubWFwKHJlbmRlcilcbiAgICApO1xuICB9O1xuXG4gIHJldHVybiByZXBvVmlldztcbn0pKCk7XG4iLCJ2YXIgcmVzdW1lQ29udHJvbGxlciA9IChmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgY29udHJvbGxlciA9IHt9O1xuXG4gIGNvbnRyb2xsZXIuc2hvdyA9IGZ1bmN0aW9uIChjdHgsIG5leHQpIHtcbiAgICByZXN1bWVWaWV3LmluaXRQYWdlKGN0eC5qb2JzKTtcbiAgfTtcblxuICBjb250cm9sbGVyLmxvYWRBbGwgPSBmdW5jdGlvbiAoY3R4LCBuZXh0KSB7XG4gICAgdmFyIGpvYkRhdGEgPSBmdW5jdGlvbiAoam9icykge1xuICAgICAgY3R4LmpvYnMgPSByZXN1bWVEYXRhLmFsbDtcbiAgICAgIG5leHQoKTtcbiAgICB9O1xuXG4gICAgaWYgKHJlc3VtZURhdGEuYWxsLmxlbmd0aCkge1xuICAgICAgY3R4LmpvYnMgPSByZXN1bWVEYXRhLmFsbDtcbiAgICAgIG5leHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdW1lRGF0YS5mZXRjaEFsbChyZXN1bWVEYXRhKTtcbiAgICB9XG5cbiAgfTtcblxuICByZXR1cm4gY29udHJvbGxlcjtcblxufSgpKTtcbiIsInZhciByZXN1bWVEYXRhID0gKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICAvLyBUTyBETzogY3JlYXRlIEFKQVggY2FsbFxuXG4gIGZ1bmN0aW9uIEpvYihvcHRzKSB7XG4gICAgdGhpcy50aXRsZSA9IG9wdHMudGl0bGU7XG4gICAgdGhpcy5jb21wYW55ID0gb3B0cy5jb21wYW55O1xuICAgIHRoaXMuY29tcGFueVVSTCA9IG9wdHMuY29tcGFueVVSTDtcbiAgICB0aGlzLmNvbXBhbnlMb2dvID0gb3B0cy5jb21wYW55TG9nbztcbiAgICB0aGlzLmRhdGVGcm9tID0gb3B0cy5kYXRlRnJvbTtcbiAgICB0aGlzLmRhdGVUbyA9IG9wdHMuZGF0ZVRvO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBvcHRzLmRlc2NyaXB0aW9uO1xuICB9XG5cbiAgSm9iLmFsbCA9IFtdO1xuXG4gIEpvYi5sb2FkQWxsID0gZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgIHRoaXMuYWxsID0gZGF0YVxuICAgICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIChuZXcgRGF0ZShiLmRhdGVGcm9tKSkgLSAobmV3IERhdGUoYS5kYXRlRnJvbSkpO1xuICAgICAgfSlcbiAgICAgIC5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBKb2IoaXRlbSk7XG4gICAgICB9KTtcblxuICB9O1xuXG4gIEpvYi5mZXRjaEFsbCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5yZXN1bWVEYXRhICYmIGxvY2FsU3RvcmFnZS5yZXN1bWVEYXRhICE9PSAndW5kZWZpbmVkJykge1xuXG4gICAgICB0aGlzLmxvYWRBbGwoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UucmVzdW1lRGF0YSkpO1xuICAgICAgY2FsbGJhY2soKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgICQuZ2V0SlNPTignLy4uL2RhdGEvcmVzdW1lRGF0YS5qc29uJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgSm9iLmxvYWRBbGwoZGF0YSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZXN1bWVEYXRhJywgSlNPTi5zdHJpbmdpZnkoSm9iLmFsbCkpO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSkuZmFpbChmdW5jdGlvbiAoeCwgdGV4dFN0YXR1cywgeSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdSZXN1bWUgZmFpbGVkIHRvIGxvYWQuIEVycm9yOiAnLCB0ZXh0U3RhdHVzKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH07XG5cbiAgcmV0dXJuIEpvYjtcbn0oKSk7XG4iLCJ2YXIgcmVzdW1lVmlldyA9IChmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgdmlldyA9IHtcbiAgICB0ZW1wbGF0ZVNjcmlwdDogJCgnI3Jlc3VtZVRlbXBsYXRlJykuaHRtbCgpLFxuICAgIHRoZVRlbXBsYXRlOiBudWxsXG4gIH07XG5cbiAgdmlldy50b0hUTUwgPSBmdW5jdGlvbiAoam9iKSB7XG5cbiAgICB0aGlzLnRoZVRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKHZpZXcudGVtcGxhdGVTY3JpcHQpO1xuXG4gICAgcmV0dXJuIHRoaXMudGhlVGVtcGxhdGUoam9iKTtcblxuICB9O1xuXG4gIHZpZXcuaW5pdFBhZ2UgPSBmdW5jdGlvbiAoam9icykge1xuICAgICQoJy5zZWN0aW9uLXZpZXcnKS5oaWRlKCk7XG5cbiAgICB2YXIgJHJlc3VtZSA9ICQoJyNyZXN1bWUnKTtcblxuICAgICRyZXN1bWUuZW1wdHkoKTtcblxuICAgIGpvYnMuZm9yRWFjaChmdW5jdGlvbiAoam9iKSB7XG4gICAgICAkcmVzdW1lLmFwcGVuZCh2aWV3LnRvSFRNTChqb2IpKTtcbiAgICB9KTtcblxuICAgICRyZXN1bWUuc2hvdygpO1xuXG4gIH07XG5cbiAgcmV0dXJuIHZpZXc7XG5cbn0oKSk7XG4iLCJwYWdlKCcvJywgaW5kZXhDb250cm9sbGVyLnNob3cpO1xucGFnZSgnL3Byb2plY3RzJywgYmxvZ0NvbnRyb2xsZXIubG9hZEFsbCwgYmxvZ0NvbnRyb2xsZXIuc2hvdyk7XG5wYWdlKCcvcmVzdW1lJywgcmVzdW1lQ29udHJvbGxlci5sb2FkQWxsLCByZXN1bWVDb250cm9sbGVyLnNob3cpO1xucGFnZSgnL2NvbnRhY3QnLCBjb250YWN0Q29udHJvbGxlci5zaG93KTtcblxuLy8gVE8gRE86IEFkZCBhbiBhY3R1YWwgZXJyb3IgcGFnZVxucGFnZSgnKicsIGZ1bmN0aW9uICgpIHtcbiAgY29uc29sZS5lcnJvcignVGhpcyBzaG91bGQgYmUgYSA0MDQgRXJyb3IgUGFnZScpO1xufSk7XG5cbnBhZ2UoKTtcbiJdfQ==
