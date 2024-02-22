import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import useOutsideAlerter from "../../hooks/useOutsideAlert";
import useScrollPosition from "../../hooks/useScrollPosition";
import Logo from "../../images/logo.png?url";
import Whitelogo from "../../images/logowhite.png?url";
import Menu from "../../images/menu.svg?url";
import {
  councilChildren,
  eventsChildren,
  moreChildren,
} from "../../constants/menuChildrenData";

interface LinkButton {
  type: string;
  children: React.ReactNode;
  href?: string;
  subLinks?: (Children | null)[];
  menuIndex: number;
  activateSubMenu: (
    e: React.MouseEvent<HTMLElement | MouseEvent>,
    menuIndex: number
  ) => void;
}

interface Children {
  name: string;
  href: string;
}
interface Link {
  parent: string;
  children?: Array<Children | null>;
  menuIndex: number;
  href?: string;
}

function LinkButton(props: LinkButton) {
  const { type, children, href = "#", activateSubMenu, menuIndex } = props;

  if (type === "BUTTON") {
    return (
      <>
        <button
          onClick={(e) => {
            activateSubMenu(e, menuIndex);
          }}
        >
          {children}
        </button>
      </>
    );
  }
  return <a href={href}>{children}</a>;
}

const updatedLinks: Link[] = [
  { parent: "Home", menuIndex: 0, href: "/" },
  { parent: "Office Bearers", menuIndex: 1, href: "/office-bearers/" },
  { parent: "Blogs", menuIndex: 2, href: "/blogs" },
  {
    parent: "Councils",
    children: councilChildren,
    menuIndex: 3,
    href: "/councils/general",
  },
  {
    parent: "Events and Fests",
    children: eventsChildren,
    menuIndex: 4,
    href: "/events/elan",
  },
  { parent: "Organization Clubs", menuIndex: 5, href: "/special-clubs" },
  { parent: "Student's Guide", menuIndex: 6, href: "/freshers-guide" },
  { parent: "More", children: moreChildren, menuIndex: 7, href: "/more" },
];

export function Button(props: { children: string }) {
  return (
    <button className="px-4 py-2 w-[12rem] text-xl border-black rounded-lg active:bg-slate-200">
      {props.children}
    </button>
  );
}

function MobileNavbar() {
  const [active, setActive] = useState<boolean>(false);
  const scrollRef = useRef(0);
  const prevScroll = useRef(0);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileNavbar = useRef<HTMLDivElement>(null);

  const activateMobileMenu = () => {
    setActive(true);
  };

  const deActivateMobileMenu = () => {
    gsap.to(mobileMenuRef.current, {
      autoAlpha: 0,
      duration: 0.2,
      onComplete: () => {
        setActive(false);
      },
    });
  };

  useEffect(() => {
    if (active) {
      document.body.style.overflowY = "hidden";
      gsap.from(mobileMenuRef.current, { autoAlpha: 0, stagger: 0.1 });
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [active]);

  const getPosition = () => {
    return window.scrollY;
  };

  useEffect(() => {
    function handleScroll() {
      scrollRef.current = getPosition();
      if (scrollRef.current <= prevScroll.current) {
        gsap.to(mobileNavbar.current, {
          y: "0%",
        });
      }
      if (scrollRef.current > prevScroll.current) {
        gsap.to(mobileNavbar.current, {
          y: "-100%",
        });
      }
      prevScroll.current = scrollRef.current;
    }
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        ref={mobileNavbar}
        className="bg-white flex justify-between px-4 py-2 w-full z-40 lg:hidden fixed"
      >
        <div>
          <a href="/">
            <div className="h-[4rem] w-[4rem] relative">
              <img src={Logo} alt="gymkhana logo" />
            </div>
          </a>
        </div>
        <button
          className="pr-2"
          onClick={() => {
            activateMobileMenu();
          }}
        >
          <img src={Menu} alt="menu" />
        </button>
      </nav>
      {active && (
        <div
          ref={mobileMenuRef}
          className="mobileMenu fixed z-40 w-full h-full "
        >
          <div className="fixed right-5 top-5 text-lg">
            <button onClick={deActivateMobileMenu}>Close</button>
          </div>
          <ul className="bg-white text-center pb-6 h-full flex-grow flex flex-col justify-center items-center">
            {updatedLinks.map((el) => (
              <li key={el.parent} className="pt-3 menu-items">
                <a href={el.href}>
                  <Button>{el.parent}</Button>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

function MainNavbar({
  blackOn,
  disableAnimation,
}: {
  blackOn: boolean;
  disableAnimation: boolean;
}) {
  const [activeSubMenu, setActiveSubMenu] = useState<number | null>(null);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [logo, setLogo] = useState(Logo);
  const buttonRef = useRef<any>();
  const subMenuRef = useRef<any>();
  const navRef = useRef<HTMLDivElement>(null);

  const activateSubMenu = (
    e: React.MouseEvent<HTMLElement | MouseEvent>,
    menuIndex: number
  ) => {
    setActiveSubMenu((prevMenuIndex) => {
      //  return prevMenuIndex===menuIndex ? null : menuIndex
      return prevMenuIndex === menuIndex ? null : menuIndex;
    });
    buttonRef.current = e;
    setTop(buttonRef.current.target.offsetTop);
    setLeft(buttonRef.current.target.offsetLeft);
  };
  useOutsideAlerter(subMenuRef, () => {
    setActiveSubMenu(null);
  });

  const scrollPosition = useScrollPosition();

  if (!disableAnimation) {
    if (scrollPosition > 0) {
      gsap.to(navRef.current, { background: "white", color: "black" });
    } else {
      gsap.to(navRef.current, {
        backgroundColor: "transparent",
        color: "white",
      });
    }
  } else {
    gsap.set(navRef.current, { background: "white" });
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed justify-between ${
          blackOn ? "text-black bg-white" : "text-white bg-transparent"
        } px-4 py-2 w-full z-40 hidden lg:flex lg:items-center lg:flex-row`}
      >
        <div className="inline-block">
          <a href="/">
            <div className="h-[4rem] w-[4rem] relative ">
              <img
                src={
                  disableAnimation
                    ? Logo
                    : scrollPosition !== 0
                    ? Logo
                    : Whitelogo
                }
                alt="gymkhana logo"
              />
            </div>
          </a>
        </div>
        <div className="inline-block">
          <ul className="flex gap-5">
            {updatedLinks.map((el) => (
              <li
                key={el.parent}
                onMouseEnter={(e) => {
                  activateSubMenu(e, el.menuIndex);
                }}
              >
                <LinkButton
                  subLinks={el?.children}
                  menuIndex={el.menuIndex}
                  activateSubMenu={activateSubMenu}
                  type={el.children ? "BUTTON" : "ANCHOR"}
                  href={el?.href}
                >
                  {el.parent}
                </LinkButton>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {activeSubMenu && (
        <div
          ref={subMenuRef}
          className="bg-white text-black inline-block fixed z-40"
          style={{
            left: activeSubMenu !== 7 ? left : left - 165,
            top: top + 60,
          }}
        >
          <ul className="text-md">
            {updatedLinks[activeSubMenu]?.children?.map((el) =>
              el ? (
                <a href={el.href} key={el.href} className="hover:bg-slate-300">
                  <li className="pl-3 pr-5 py-2 hover:bg-slate-100 transition-all">
                    {el.name}
                  </li>
                </a>
              ) : null
            ) ?? []}
          </ul>
        </div>
      )}
    </>
  );
}

function Navbar({ blackOn = true, disableAnimation = true }) {
  return (
    <>
      <MobileNavbar />
      <MainNavbar blackOn={blackOn} disableAnimation={disableAnimation} />
    </>
  );
}

export default Navbar;
