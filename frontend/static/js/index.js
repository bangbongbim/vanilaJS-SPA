import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import Settings from "./views/Settings.js";
import NotFound from "./views/NotFound.js";

// 페이지 전환 함수
const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/posts", view: Posts },
    { path: "/settings", view: Settings },
    { path: "/404", view: NotFound },
  ];

  // 현재 route와 현재 페이지 경로가 일치하는지 테스트
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  // find 메서드를 사용해 isMatch가 true인 객체를 찾음
  // find() -> 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환
  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  // isMatch true인 객체가 없을 때 404 페이지로 이동
  if (!match) {
    match = {
      route: routes[routes.length - 1],
      isMatch: true,
    };
  }

  console.log(match.route);
  const view = new match.route.view();

  document.querySelector("#app").innerHTML = await view.getHtml();

  // 뒤로가기 하거나 새로고침 했을 때 router도 그 페이지에 맞게 동작
  window.addEventListener("popstate", router);
};

// DOM이 렌더링 되면 router함수 실행
document.addEventListener("DOMContentLoaded", () => {
  // 클릭 이벤트가 발생했을 때,
  // 해당 targer이 data-link attribute가 있다면
  // 페이지 이동 함수 발생

  // matches(css선택자) => css 선택자로 특정 엘리먼트를 찾음
  // history.pushState(state,title,url)
  // state : 페이지 변환 시 넘겨줄 데이터 , title : 변경할 부라우저 title , URL
  // 리액트의 react-router와 같은 기능을 함
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});
