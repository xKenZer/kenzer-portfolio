(async function () {
  const userId = window.DISCORD_USER_ID;
  if (!userId || userId.includes("PASTE")) return;

  const elAvatar = document.getElementById("dAvatar");
  const elStatus = document.getElementById("dStatus");
  const elName = document.getElementById("dName");
  const elTag = document.getElementById("dTag");
  const elTitle = document.getElementById("dActivityTitle");
  const elSub = document.getElementById("dActivitySub");

  const statusColor = {
    online: "#22c55e",
    idle: "#f59e0b",
    dnd: "#ef4444",
    offline: "#6b7280",
  };

  function pickActivity(data) {
    const acts = data?.activities || [];
    // Prefer a real activity/game over custom status
    const real = acts.find(a => a.type !== 4) || null;
    const custom = acts.find(a => a.type === 4) || null;

    if (real) {
      return {
        title: real.name || "Playing",
        sub: real.details || real.state || "In game",
      };
    }
    if (custom) {
      return {
        title: "Status",
        sub: custom.state || "Idle",
      };
    }
    return { title: "Not doing anything", sub: "Chilling / Offline" };
  }

  async function refresh() {
    try {
      // Lanyard API endpoint (requires joining Lanyard once for presence) :contentReference[oaicite:2]{index=2}
      const r = await fetch(`https://api.lanyard.rest/v1/users/${userId}`, { cache: "no-store" });
      const j = await r.json();
      const d = j?.data;

      const du = d?.discord_user;
      const username = du?.global_name || du?.username || "Discord User";
      const handle = du?.username ? `@${du.username}` : "@discord";
      elName.textContent = username;
      elTag.textContent = handle;

      const status = d?.discord_status || "offline";
      elStatus.style.background = statusColor[status] || statusColor.offline;
      elStatus.title = status;

      // Avatar
      if (du?.id && du?.avatar) {
        const isGif = du.avatar.startsWith("a_");
        const ext = isGif ? "gif" : "png";
        elAvatar.src = `https://cdn.discordapp.com/avatars/${du.id}/${du.avatar}.${ext}?size=128`;
      }

      const act = pickActivity(d);
      elTitle.textContent = act.title;
      elSub.textContent = act.sub;
    } catch (e) {
      elTitle.textContent = "Couldn’t load Discord";
      elSub.textContent = "Check your User ID / Lanyard join";
    }
  }

  await refresh();
  setInterval(refresh, 15000); // refresh every 15s (smooth, not spammy)
})();
