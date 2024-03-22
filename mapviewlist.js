import 'Origo';

const Mapviewlist = function Mapviewlist(options = {}) {
  const tooltiptextGeneral = 'Välj vy, nuvarande vy:';
  const links = options.links;
  const currentUrl = window.location.href;
  let activeLink = null;
  let isMainButtonActive = false;
  let viewer;
  let containerElement;
  let mapviewlistMainButton;
  let target;
  const buttons = [];
  const subButtons = [];

  function toggleMainButton() {
    if (!isMainButtonActive) {
      document.getElementById(mapviewlistMainButton.getId()).classList.add('active-border');
      subButtons.forEach((button) => {
        document.getElementById(button.getId()).classList.remove('hidden');
      });
      isMainButtonActive = true;
    } else {
      document.getElementById(mapviewlistMainButton.getId()).classList.remove('active-border');
      subButtons.forEach((button) => {
        document.getElementById(button.getId()).classList.add('hidden');
      });
      isMainButtonActive = false;
    }
  }

  return Origo.ui.Component({
    name: 'mapviewlist',
    onInit() {
      containerElement = Origo.ui.Element({
        tagName: 'div',
        cls: 'subbuttons-container-grid subbutton-row-grid'
      });

      // Loops through each link defined in index.html and finds the active link based on the current url
      links.forEach((link) => {
        if (link.url === currentUrl) {
          activeLink = link;
        }

        // If the active link is found, use its buttonImage as icon for mapviewlistMainButton and its tooltiptext/title
        // Combines tooltiptextGeneral and title from index.html to display "Select view, current view: "title".
        const icon = activeLink ? activeLink.buttonImage : '#ic_baseline_link_24px';
        const title = link.title;
        const combinedTooltip = `${tooltiptextGeneral} ${title}`;
        const tooltipText = combinedTooltip;

        if (currentUrl === link.url) {
          mapviewlistMainButton = Origo.ui.Button({
            cls: 'o-mapviewlist padding-small margin-right-small icon-smaller round light box-shadow',
            icon,
            title,
            tooltipText,
            tooltipPlacement: 'east',
            click() {
              toggleMainButton(mapviewlistMainButton);
            }

          });
        }
      });

      buttons.push(mapviewlistMainButton);
      // Loops through each link defined in index.html
      links.forEach((link) => {
        const title = link.title;
        const ButtonImage = link.buttonImage || '#fa-external-link';

        // Checks that the current link is not the main link, because its buttonImage should not be displayed on click of the main button
        if (currentUrl !== link.url) {
          const subButton = Origo.ui.Button({
            cls: 'subbutton-grid padding-small margin-right-small icon-smaller round light box-shadow hidden',
            // cls: 'subbuttons-container subbutton padding-small margin-right-small icon-smaller round light box-shadow hidden',
            icon: ButtonImage,
            title,
            tooltipPlacement: 'relative',
            click() {
              window.location.href = link.url;
            }
          });

          buttons.push(subButton);
          subButtons.push(subButton);
        }
      });
    },
    onAdd(evt) {
      viewer = evt.target;
      target = `${viewer.getMain().getNavigation().getId()}`; // Places the component in Navigation
      this.addComponents(buttons);
      this.render();
    },
    hide() {
      document.getElementById(containerElement.getId()).classList.add('hidden');
    },
    unhide() {
      document.getElementById(containerElement.getId()).classList.remove('hidden');
    },
    render() {
      let htmlString = `${containerElement.render()}`;
      let el = Origo.ui.dom.html(htmlString);
      document.getElementById(target).prepend(el);

      // To get the actual HTML element
      const containerElementElement = document.getElementById(containerElement.getId());

      // Renders mapviewlistMainButton
      htmlString = mapviewlistMainButton.render();
      el = Origo.ui.dom.html(htmlString);
      containerElementElement.appendChild(el);

      // Renders subButtons
      subButtons.forEach((subButton) => {
        htmlString = subButton.render();
        el = Origo.ui.dom.html(htmlString);
        containerElementElement.appendChild(el);
      });

      this.dispatch('render');
    }
  });
};

export default Mapviewlist;
