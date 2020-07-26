const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  {
    logo: "./images/bilibili.com",
    url: "https://www.bilibili.com",
    logoType: "image",
  },
  {
    logo: "G",
    url: "https://github.com",
    logoType: "text",
  },
  {
    logo: "W",
    url: "https://www.wangdoc.com",
    logoType: "text",
  },
  {
    logo: "Y",
    url: "https://yuque.com/regety",
    logoType: "text",
  },
];

const simplifyUrl = (url) => {
  return url.replace("https://", "").replace("http://", "").replace("www", "");
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node) => {
    const $li = $(`<li>
      <a href="${node.url}">
        <div class="site">
          <div class="logo">${node.logo[0]}</div>
          <div class="link">${simplifyUrl(node.url)}</div>
        </div>
      </a>
    </li>`).insertBefore($lastLi);
  });
};
render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是啥");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: url[0],
    logoType: "text",
    url: url,
  });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};
