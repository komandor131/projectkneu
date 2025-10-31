document.addEventListener("DOMContentLoaded", () => {
  const revealables = document.querySelectorAll(".reveal");

  if (revealables.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );

    revealables.forEach((element) => observer.observe(element));
  }

  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      card.style.setProperty("--pointer-x", `${x}px`);
      card.style.setProperty("--pointer-y", `${y}px`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--pointer-x");
      card.style.removeProperty("--pointer-y");
    });
  });

  const setupTabs = (tabSelector, panelSelector) => {
    const tabs = document.querySelectorAll(tabSelector);
    const panels = document.querySelectorAll(panelSelector);

    if (!tabs.length || !panels.length) return;

    tabs.forEach((tab) => {
      const isActive = tab.classList.contains("is-active");
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    const focusableTabs = Array.from(tabs);

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.role;
        if (!target || tab.classList.contains("is-active")) return;

        focusableTabs.forEach((btn) => {
          const active = btn === tab;
          btn.classList.toggle("is-active", active);
          btn.setAttribute("aria-selected", active ? "true" : "false");
          btn.setAttribute("tabindex", active ? "0" : "-1");
        });

        panels.forEach((panel) => {
          const matches = panel.dataset.panel === target;
          panel.classList.toggle("is-active", matches);
          panel.setAttribute("aria-hidden", matches ? "false" : "true");
        });
      });

      tab.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        const currentIndex = focusableTabs.indexOf(tab);
        const delta = event.key === "ArrowRight" ? 1 : -1;
        const nextIndex = (currentIndex + delta + focusableTabs.length) % focusableTabs.length;
        const nextTab = focusableTabs[nextIndex];
        nextTab.focus();
        nextTab.click();
      });
    });
  };

  setupTabs(".softskills__tab", ".softskills__content");
  setupTabs(".hardskills__tab", ".hardskills__content");
  setupTabs(".career__tab", ".career__content");

  const tableCells = document.querySelectorAll(".comparison-table td, .comparison-table th");
  tableCells.forEach((cell) => {
    cell.addEventListener("pointermove", (event) => {
      const rect = cell.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      cell.style.setProperty("--hover-x", `${x}%`);
      cell.style.setProperty("--hover-y", `${y}%`);
      cell.style.setProperty("--hover-opacity", "1");
    });

    cell.addEventListener("pointerleave", () => {
      cell.style.removeProperty("--hover-opacity");
    });
  });

  const diffCards = document.querySelectorAll(".diff-card");
  if (diffCards.length) {
    diffCards.forEach((card) => {
      card.addEventListener("pointerenter", () => {
        diffCards.forEach((other) => {
          other.classList.toggle("is-focus", other === card);
          other.classList.toggle("is-muted", other !== card);
        });
      });

      card.addEventListener("pointerleave", () => {
        diffCards.forEach((other) => {
          other.classList.remove("is-focus", "is-muted");
        });
      });
    });
  }
});
