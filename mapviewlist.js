import 'Origo';
import loadIcons from './loadresources';

const Mapviewlist = function Mapviewlist(options = {}) {
  const links = options.links;
  const currentUrl = window.location.origin + window.location.pathname;
  let isMainButtonActive = false;
  let viewer;
  let containerElement;
  let mapviewlistMainButton;
  let target;
  const buttons = [];

  function toggleMainButton() {
    if (!isMainButtonActive) {
      document.getElementById(containerElement.getId()).classList.remove('subbuttons-container-grid-behind');
      document.getElementById(mapviewlistMainButton.getId()).classList.add('active-border');
      buttons.forEach((button, index) => {
        if (index > 0) document.getElementById(button.getId()).classList.remove('hidden');
      });
      isMainButtonActive = true;
    } else {
      document.getElementById(containerElement.getId()).classList.add('subbuttons-container-grid-behind');
      document.getElementById(mapviewlistMainButton.getId()).classList.remove('active-border');
      buttons.forEach((button, index) => {
        if (index > 0) document.getElementById(button.getId()).classList.add('hidden');
      });
      isMainButtonActive = false;
    }
  }

  return Origo.ui.Component({
    name: 'mapviewlist',
    onInit() {
      loadIcons();

      containerElement = Origo.ui.Element({
        tagName: 'div',
        cls: 'subbuttons-container-grid subbutton-row-grid subbuttons-container-grid-behind'
      });

      // put the current link first in the links array (if not part of the array then make it so)
      const currentLinkIndex = links.findIndex((link) => link.url === currentUrl);
      if (currentLinkIndex !== -1) links.unshift(links.splice(currentLinkIndex, 1)[0]);
      else {
        links.unshift({
          title: 'Okänd sida',
          buttonImage: '#mapviewlist_ic_not_listed_location_24px',
          url: currentUrl
        });
      }

      // create the button for the current link
      const icon = links[0].buttonImage;
      const title = links[0].title;
      mapviewlistMainButton = Origo.ui.Button({
        cls: 'padding-small margin-right-small icon-smaller round light box-shadow',
        icon,
        title,
        tooltipText: 'Välj vy',
        tooltipPlacement: 'east',
        click() {
          toggleMainButton();
        }
      });

      buttons.push(mapviewlistMainButton);
      links.shift();

      // create buttons for the rest of the links
      links.forEach((link) => {
        const linkTitle = link.title;
        const ButtonImage = link.buttonImage || '#fa-external-link';

        const subButton = Origo.ui.Button({
          cls: 'subbutton-grid padding-small margin-right-small icon-smaller round light box-shadow hidden',
          icon: ButtonImage,
          tooltipText: linkTitle,
          tooltipPlacement: 'east',
          click() {
            window.location.href = link.url;
          }
        });

        // order attachment of listerners while we have a link ref
        subButton.on('render', () => {
          const subButtonElement = document.getElementById(subButton.getId());
          subButtonElement.addEventListener('auxclick', () => {
            window.open(link.url, '_blank');
          });
        });

        buttons.push(subButton);
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
      document.getElementById(target).prepend(Origo.ui.dom.html(containerElement.render()));
      const containerElementElement = document.getElementById(containerElement.getId());

      buttons.forEach((button) => {
        containerElementElement.append(Origo.ui.dom.html(button.render()));
      });

      this.dispatch('render');
    }
  });
};

export default Mapviewlist;
