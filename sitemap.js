(function() {
  const blogURL = "https://www.edukrein.com/";
  const maxResults = 150;
  const allowedLabels = ["Sosiologi", "Literasi Digital"];

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
      section.className = "accordion-section"; // Menambahkan kelas baru
      
      let header = document.createElement("button");
      header.className = "accordion-header"; // Menambahkan kelas baru
      header.innerHTML = `${label} (${count})`;
      
      let content = document.createElement("div");
      content.className = "accordion-content"; // Menambahkan kelas baru

      // Membungkus tabel dengan div responsif
      let tableContainer = document.createElement("div");
      tableContainer.className = "responsive-table";
      
      let table = document.createElement("table");
      // Menambahkan kelas dari CSS eksternal ke tabel
      table.className = "static-page-table";
      
      // Menggunakan kelas CSS untuk header tabel
      let thead = `<thead class="table-header">
        <tr>
          <th>Judul</th>
          <th>Penulis</th>
          <th>Tanggal</th>
          <th>Pembaharuan</th>
        </tr>
      </thead>`;

      let rows = posts.map(p => `
        <tr>
          <td><a href="${p.link}" target="_blank">${p.title}</a></td>
          <td>${p.author}</td>
          <td>${p.published}</td>
          <td>${p.updated}</td>
        </tr>
      `).join("");

      table.innerHTML = thead + "<tbody>" + rows + "</tbody>";
      
      tableContainer.appendChild(table);
      content.appendChild(tableContainer);

      header.addEventListener("click", function() {
        content.style.display = (content.style.display === "none") ? "block" : "none";
      });

      section.appendChild(header);
      section.appendChild(content);
      container.appendChild(section);
    });
  }

  fetchPosts(1);
})();
