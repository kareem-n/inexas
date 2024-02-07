window.addEventListener("load", function () {
  const headerHolo = document.querySelector("header .holo");
  const windowCenter = window.innerWidth / 2;

  document.addEventListener("mousemove", function (e) {
    headerHolo.style.transform = `translate( ${
      (e.clientX - windowCenter) / 5
    }px , ${e.clientY / 5}px)`;
  });

  const clickBtnAnimation = Array.from(
    document.querySelectorAll(".clickBtnAnimation")
  );

  clickBtnAnimation.map((btn) => {
    btn.addEventListener("click", function () {
      console.log(btn);

      this.addEventListener("animationend", function () {
        this.classList.remove("animate__heartBeat");
      });

      this.classList.add("animate__heartBeat");
    });
  });

  // navbar color change while scrolling
  const navbar = document.querySelector("nav");
  const checkWindowScrollY = () => {
    if (window.scrollY > 200) {
      navbar.classList.add("bg-black");
    } else {
      navbar.classList.remove("bg-black");
    }
  };

  checkWindowScrollY();

  let lastScrollTop = 0;
  let timer = 0;

  window.addEventListener("scroll", () => {
    checkWindowScrollY();
    clearTimeout(timer);
    const st = document.documentElement.scrollTop;

    timer = setTimeout(() => {
      navbar.style.top = "0px";
    }, 200);

    if (st > lastScrollTop) {
      // Scrolling down
      navbar.style.top = "-" + navbar.offsetHeight + "px";
    } else {
      // Scrolling up
      navbar.style.top = "0px";
    }
    lastScrollTop = st;
  });

  const navbarToggle = document.querySelector(".toggle");
  const smToggle = document.querySelector(".smToggle");
  const navList = navbar.getElementsByClassName("nav-items")[0].cloneNode(true);
  smToggle.style.paddingTop = navbar.offsetHeight + 20 + "px";
  smToggle.insertBefore(navList, smToggle.firstChild);
  navList.classList.remove("hidden");

  navbarToggle.addEventListener("click", () => {
    smToggle.firstElementChild.style.setProperty("--animate-duration", "0.3s");

    smToggle.firstElementChild.classList.add(
      "animate__animated",
      "animate__zoomInLeft"
    );

    Array.from(smToggle.firstElementChild.children).map((item, i) => {
      item.addEventListener("click", () => {
        // document.body.style.overflowY = "auto";

        navbar.classList.remove("bg-gray-800");
        navbarToggle.style.marginRight = "";
        navbarToggle.innerHTML = "<i class='fas text-xl fa-bars'></i>";
        smToggle.classList.add("hidden");
      });

      item.firstElementChild.classList.add(
        "text-3xl",
        "text-center",
        "py-5",
        "border-opacity-20",
        "border-b",
        "rubik-font"
      );

      if (Array.from(smToggle.firstElementChild.children).length - 1 == i) {
        item.firstElementChild.classList.remove("border-b");
      }
    });

    if (navbarToggle.firstElementChild.classList.contains("fa-xmark")) {
      // document.body.style.overflow = "auto";

      navbar.classList.remove("bg-gray-800");
      navbarToggle.style.marginRight = "";
      navbarToggle.innerHTML = "<i class='fas text-xl fa-bars'></i>";
      smToggle.classList.add("hidden");
    } else {
      // document.body.style.overflow = "hidden";
      navbar.classList.add("bg-gray-800");
      navbarToggle.style.marginRight = "28px";
      navbarToggle.innerHTML = "<i class='fas fa-2x fa-xmark'></i>";
      smToggle.classList.remove("hidden");
    }
  });

  const teamSectionItems = document.querySelectorAll(".teamSectionItem");

  for (let iterator = 0; iterator < teamSectionItems.length; iterator++) {
    teamSectionItems[iterator].addEventListener("mouseenter", function () {
      teamSectionItems.forEach((element) => {
        if (teamSectionItems[iterator] != element) {
          element.firstElementChild.classList.add("grayscale");
        }
      });
    });
    teamSectionItems[iterator].addEventListener("mouseleave", function () {
      teamSectionItems.forEach((element) => {
        if (teamSectionItems[iterator] != element) {
          element.firstElementChild.classList.remove("grayscale");
        }
      });
    });
  }
  const copyElements = document.querySelectorAll("img[title='copy']");

  copyElements.forEach((element) => {
    element.addEventListener("click", function () {
      window.navigator.clipboard.writeText(element.parentNode.innerText);

      element.setAttribute("src", "./src/images/copied.svg");
      const alertCopied = document.createElement("span");
      alertCopied.innerText = "copied!";
      element.insertBefore(alertCopied, element.nextSibling);
    });
  });

  let contactInputs = document.querySelectorAll(".contactInput");

  const inputStateFocus = (input) => {
    if (input.nodeName == "TEXTAREA") {
      input.previousElementSibling.style.top = "2%";
    } else {
      input.previousElementSibling.style.top = "25%";
    }

    input.classList.replace("border-opacity-50", "border-opacity-70");
    input.previousElementSibling.style.fontSize = "13px";
  };
  const inputStateBlur = (input) => {
    input.classList.replace("border-opacity-70", "border-opacity-50");
    input.previousElementSibling.style.top = "";
    input.previousElementSibling.style.fontSize = "";
  };

  contactInputs.forEach((input) => {

    
    input.addEventListener("focus", function () {
      inputStateFocus(input);
    });

    input.addEventListener("blur", function () {
      if (input.value != "") {
        inputStateFocus(input);
        return;
      }
      inputStateBlur(input);
    });
  });
});
