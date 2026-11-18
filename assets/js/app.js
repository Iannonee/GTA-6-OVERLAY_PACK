(() => {
  const cfg = window.VICE_CITY_CONFIG || {};
  const colors = cfg.colors || {};
  const root = document.documentElement;
  const cssVars = {
    pink: "--pink", pinkLight: "--pink2", orange: "--orange",
    cyan: "--cyan", background: "--ink"
  };
  Object.entries(cssVars).forEach(([key, variable]) => {
    if (colors[key]) root.style.setProperty(variable, colors[key]);
  });

  document.querySelectorAll("[data-channel-name]").forEach(el => el.textContent = cfg.channelName || "VICE CITY LIVE");
  document.querySelectorAll("[data-tagline]").forEach(el => el.textContent = cfg.tagline || "THE NIGHT SHIFT");
  document.querySelectorAll("[data-slogan]").forEach(el => el.textContent = cfg.slogan || "Vice City Never Sleeps");

  document.querySelectorAll("[data-streamer]").forEach(el => el.textContent = cfg.streamerName || "Br3nDy4R");

  const cfgScript = document.querySelector('script[src$="config.js"]');
  const siteRoot = cfgScript ? new URL("../../", cfgScript.src) : new URL("./", location.href);
  const bgs = cfg.backgrounds || {};
  document.querySelectorAll("[data-bg]").forEach(el => {
    const path = bgs[el.dataset.bg];
    if (!path) return;
    el.style.background = `url("${new URL(path, siteRoot).href}") center/cover no-repeat`;
    el.classList.add("has-img");
    const scene = el.closest(".obs-scene");
    if (scene) scene.classList.add("has-img");
  });

  const social = cfg.social || {};
  document.querySelectorAll("[data-social]").forEach(el => {
    const key = el.dataset.social;
    if (social[key]) el.textContent = social[key];
  });

  const layout = cfg.layout || {};
  document.querySelectorAll("[data-layout]").forEach(el => {
    const key = el.dataset.layout;
    if (layout[key] === false) el.hidden = true;
  });

  const countdown = document.querySelector("[data-countdown]");
  if (countdown) {
    const params = new URLSearchParams(location.search);
    let seconds = Number(params.get("minutes") || countdown.dataset.minutes ||
      (cfg.startingSoon && cfg.startingSoon.minutes) || 10) * 60;
    const render = () => {
      const m = Math.floor(seconds / 60).toString().padStart(2, "0");
      const s = (seconds % 60).toString().padStart(2, "0");
      countdown.textContent = `${m}:${s}`;
      if (seconds > 0) seconds--;
    };
    render();
    window.setInterval(render, 1000);
  }

  const alert = document.querySelector("[data-alert]");
  if (alert) {
    const params = new URLSearchParams(location.search);
    const type = params.get("type") || "follow";
    const name = params.get("name") || "Vice City legend";
    const labels = {
      follow: (cfg.alerts && cfg.alerts.followLabel) || "NUOVO FOLLOW",
      sub: (cfg.alerts && cfg.alerts.subLabel) || "NUOVO ABBONAMENTO",
      donation: (cfg.alerts && cfg.alerts.donationLabel) || "NUOVA DONAZIONE"
    };
    alert.querySelector("[data-alert-type]").textContent = labels[type] || labels.follow;
    alert.querySelector("[data-alert-name]").textContent = name;
    const welcome = alert.querySelector("[data-alert-welcome]");
    if (welcome) welcome.textContent = (cfg.alerts && cfg.alerts.welcome) || "WELCOME TO VICE CITY";
    if (params.get("preview") === "1" || params.has("name")) alert.classList.add("show");
  }
})();
