(function() {
  const blogURL = "https://www.edukrein.com/"; // ganti kalau domain berbeda
  const maxResults = 150; // jumlah post yang ditarik
  const allowedLabels = ["Sosiologi", "Literasi Digital"]; // label yang ingin ditampilkan

  function fetchPosts(startIndex) {
    let script = document.createElement("script");
    script.src = blogURL + "feeds/posts/summary?alt=json&max-results=" + maxResults + "&start-index=" + startIndex + "&callback=processFeed";
    document.body.appendChild(script);
  }

  let postsByLabel = {};

  window.processFeed = function(feed) {
    if (feed.feed.entry) {
      let entries = feed.feed.entry;
      entries.forEach(entry => {
        let title = entry.title.$t;
        let link = entry.link.find(l => l.rel === "alternate").href;
        let published = new Date(entry.published.$t).toLocaleDateString("id-ID");
        let updated = new Date(entry.updated.$t).toLocaleDateString("id-ID");
        let author = entry.author[0].name.$t;

        let labels = entry.category ? entry.category.map(c => c.term) : ["Tanpa Label"];

        labels.forEach(label => {
          if (allowedLabels.includes(label)) {
            if (!postsByLabel[label]) postsByLabel[label] = [];
            postsByLabel[label].push({ title, link, published, updated, author });
          }
        });
      });

      // kalau masih ada posting lanjutkan ambil
      if (entries.length === maxResults) {
        fetchPosts(startIndex + maxResults);
      } else {
        renderAccordion();
      }
    }
  };

  function renderAccordion() {
    const container = document.getElementById("sitemap-accordion");
    container.innerHTML = "";

    Object.keys(postsByLabel).forEach((label, i) => {
      let posts = postsByLabel[label];
      let count = posts.length;

      let section = document.createElement("div");
      section.style.border = "1px solid #ccc";
      section.style.marginBottom = "10px";
      section.style.borderRadius = "6px";
      section.style.overflow = "hidden";

      let header = document.createElement("button");
      header.innerHTML = `${label} (${count})`;
      header.style.width = "100%";
      header.style.textAlign = "left";
      header.style.padding = "10px";
      header.style.background = "#f2f2f2";
      header.style.border = "none";
      header.style.cursor = "pointer";
      header.style.fontWeight = "bold";

      let content = document.createElement("div");
      content.style.display = "none";
      content.style.padding = "10px";

      let table = document.createElement("table");
      table.style.width = "100%";
      table.style.borderCollapse = "collapse";

      let thead = `<thead style="background:#f9f9f9;">
        <tr>
          <th style="border:1px solid #ddd; padding:6px;">Judul</th>
          <th style="border:1px solid #ddd; padding:6px;">Penulis</th>
          <th style="border:1px solid #ddd; padding:6px;">Tanggal</th>
          <th style="border:1px solid #ddd; padding:6px;">Pembaharuan</th>
        </tr>
      </thead>`;

      let rows = posts.map(p => `
        <tr>
          <td style="border:1px solid #ddd; padding:6px;"><a href="${p.link}" target="_blank">${p.title}</a></td>
          <td style="border:1px solid #ddd; padding:6px;">${p.author}</td>
          <td style="border:1px solid #ddd; padding:6px;">${p.published}</td>
          <td style="border:1px solid #ddd; padding:6px;">${p.updated}</td>
        </tr>
      `).join("");

      table.innerHTML = thead + "<tbody>" + rows + "</tbody>";

      content.appendChild(table);

      header.addEventListener("click", function() {
        content.style.display = (content.style.display === "none") ? "block" : "none";
      });

      section.appendChild(header);
      section.appendChild(content);
      container.appendChild(section);
    });
  }

  // mulai fetch
  fetchPosts(1);
})();
