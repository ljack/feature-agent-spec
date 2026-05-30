class GalleryFeature {
  constructor() {
    this.leafletMarkersMap = {};
  }

  onInit(context) {
    const state = context.state;
    const mapEngine = context.mapEngine;

    // Render gallery container UI
    this.renderUI();

    // Render initial unvisited circle markers on map
    state.photoClusters.forEach(cluster => {
      const p = cluster.properties;
      
      const marker = L.circleMarker([cluster.geometry.coordinates[1], cluster.geometry.coordinates[0]], {
        radius: Math.min(14, 6 + p.count),
        color: "#111827",
        fillColor: "#b45309",
        fillOpacity: 0.92,
        weight: 2
      });

      marker.on('click', () => {
        this.seekToStop(state, p.km);
      });

      mapEngine.addMarker(marker);
      this.leafletMarkersMap[p.id] = marker;
    });

    // Subscribe to state updates
    state.subscribe('stopVisited', () => {
      this.updateFilmstrip(state, mapEngine);
    });

    state.subscribe('reset', () => {
      this.resetGallery(state, mapEngine);
    });

    // Initial sync
    this.updateFilmstrip(state, mapEngine);
  }

  onReset(context) {
    this.resetGallery(context.state, context.mapEngine);
  }

  renderUI() {
    const container = document.getElementById('galleryContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="glass-panel parked-gallery-panel" id="parkedGalleryPanel" style="display: none;">
        <h3 class="parked-gallery-title">Visited Photos</h3>
        <div class="parked-grid" id="parkedGridInner"></div>
      </div>
    `;
  }

  bindGalleryEvents(state) {
    const inner = document.getElementById('parkedGridInner');
    if (!inner) return;

    // Handle clicks on thumbnails
    inner.addEventListener('click', (e) => {
      const wrapper = e.target.closest('.parked-thumb-wrapper');
      if (wrapper) {
        const km = parseFloat(wrapper.getAttribute('data-km'));
        this.seekToStop(state, km);
      }
    });
  }

  seekToStop(state, km) {
    state.setPausedForPhoto(false);

    // Recalculate visited stops list on seek
    state.visitedStopsSet.clear();
    state.photoClusters.forEach(c => {
      if (km >= c.properties.km) {
        state.markStopVisited(c.properties.id);
      }
    });

    state.setProgress(km, true);

    const context = {
      state: state,
      mapEngine: window.MapEngine,
      dt: 0
    };
    window.AppRegistry.triggerSeek(context, km);
  }

  resetGallery(state, mapEngine) {
    const panel = document.getElementById('parkedGalleryPanel');
    if (panel) panel.style.display = 'none';

    const inner = document.getElementById('parkedGridInner');
    if (inner) inner.innerHTML = '';

    // Revert all markers to default circles
    state.photoClusters.forEach(cluster => {
      const p = cluster.properties;
      const currentMarker = this.leafletMarkersMap[p.id];
      
      if (currentMarker && currentMarker._isThumbnail) {
        mapEngine.removeMarker(currentMarker);

        const originalMarker = L.circleMarker([cluster.geometry.coordinates[1], cluster.geometry.coordinates[0]], {
          radius: Math.min(14, 6 + p.count),
          color: "#111827",
          fillColor: "#b45309",
          fillOpacity: 0.92,
          weight: 2
        });

        originalMarker.on('click', () => {
          this.seekToStop(state, p.km);
        });

        mapEngine.addMarker(originalMarker);
        this.leafletMarkersMap[p.id] = originalMarker;
      }
    });
  }

  updateFilmstrip(state, mapEngine) {
    const panel = document.getElementById('parkedGalleryPanel');
    const inner = document.getElementById('parkedGridInner');
    if (!panel || !inner) return;

    const visitedStops = state.photoClusters
      .filter(c => state.visitedStopsSet.has(c.properties.id))
      .sort((a, b) => a.properties.km - b.properties.km);

    this.updateVisitedMarkers(state, mapEngine);

    if (visitedStops.length === 0) {
      panel.style.display = 'none';
      return;
    }

    panel.style.display = 'flex';

    let html = "";
    visitedStops.forEach(stop => {
      const photo = stop.properties.photos[0];
      const count = stop.properties.count;

      html += `
        <div class="parked-thumb-wrapper" title="Km ${stop.properties.km.toFixed(1)}" data-km="${stop.properties.km}">
          <img src="${photo.thumb}" class="parked-thumb-img" />
          ${count > 1 ? `<div class="parked-thumb-count">${count}</div>` : ''}
        </div>
      `;
    });
    inner.innerHTML = html;
    this.bindGalleryEvents(state);
  }

  updateVisitedMarkers(state, mapEngine) {
    state.photoClusters.forEach(cluster => {
      const p = cluster.properties;
      const currentMarker = this.leafletMarkersMap[p.id];
      const isVisited = state.visitedStopsSet.has(p.id);

      if (isVisited) {
        if (currentMarker && currentMarker._isThumbnail) {
          return; // already upgraded
        }
        if (currentMarker) {
          mapEngine.removeMarker(currentMarker);
        }

        const firstPhoto = p.photos[0];
        const thumbIcon = L.divIcon({
          html: `
            <div class="parked-map-thumb-container">
              <img src="${firstPhoto.thumb}" class="parked-map-thumb" />
              ${p.count > 1 ? `<div class="parked-map-thumb-count">${p.count}</div>` : ''}
            </div>
          `,
          className: '',
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        });

        const newMarker = L.marker([cluster.geometry.coordinates[1], cluster.geometry.coordinates[0]], {
          icon: thumbIcon
        });

        newMarker._isThumbnail = true;
        newMarker.properties = p;

        newMarker.on('click', () => {
          this.seekToStop(state, p.km);
        });

        mapEngine.addMarker(newMarker);
        this.leafletMarkersMap[p.id] = newMarker;

      } else {
        if (currentMarker && currentMarker._isThumbnail) {
          mapEngine.removeMarker(currentMarker);

          const originalMarker = L.circleMarker([cluster.geometry.coordinates[1], cluster.geometry.coordinates[0]], {
            radius: Math.min(14, 6 + p.count),
            color: "#111827",
            fillColor: "#b45309",
            fillOpacity: 0.92,
            weight: 2
          });

          originalMarker.on('click', () => {
            this.seekToStop(state, p.km);
          });

          mapEngine.addMarker(originalMarker);
          this.leafletMarkersMap[p.id] = originalMarker;
        }
      }
    });
  }
}

// Register the feature
window.AppRegistry.register('gallery', new GalleryFeature());
