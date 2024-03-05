import 'Origo';

const Mapviewlist = function Mapviewlist(options = {}) {
  // const mainbuttonTooltipText = options.tooltipText || 'Välj vy';
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
      document.getElementById(mapviewlistMainButton.getId()).classList.add('active');
      subButtons.forEach((button) => {
        document.getElementById(button.getId()).classList.remove('hidden');
      });
      isMainButtonActive = true;
    } else {
      document.getElementById(mapviewlistMainButton.getId()).classList.remove('active');
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
        cls: 'flex row margin-y'
      });

      // Loopar igenom varje länk som är definierade i index.html och hittar den aktiva länken baserat på den aktuella url:en
      links.forEach((link) => {
        if (link.url === currentUrl) {
          activeLink = link;
        }

        // Om den aktiva länken hittas, använd dess buttonImage som ikon för mapviewlistMainButton och dess tooltiptext
        const icon = activeLink ? activeLink.buttonImage : '#ic_baseline_link_24px';
        const tooltipText = link.tooltipText;

        if (currentUrl === link.url) {
          // console.log('Aktuell URL: ', currentUrl); // Visar aktuell URL i konsolen

          mapviewlistMainButton = Origo.ui.Button({
            cls: 'o-mapviewlist o-measure padding-small margin-bottom-smaller icon-smaller round light box-shadow margin-right-small',
            icon,
            tooltipText,
            tooltipPlacement: 'south',
            click() {
              toggleMainButton();
            }

          });
        }
      });

      buttons.push(mapviewlistMainButton);
      // Loopar igenom varje länk som är definierade i index.html
      links.forEach((link) => {
        const tooltipText = link.tooltipText;
        const ButtonImage = link.buttonImage || '#fa-external-link';

        // Kontrollerar att den aktuella länken inte är huvudlänken, eftersom dess buttonImage inte ska inte visas vid klick på huvudknappen
        if (currentUrl !== link.url) {
          const subButton = Origo.ui.Button({
            cls: 'o-measure padding-small margin-bottom-smaller icon-smaller round light box-shadow margin-right-small hidden',
            icon: ButtonImage,
            tooltipText,
            tooltipPlacement: 'relative',
            click() {
              window.location.href = link.url; // Öppnar länken i samma fönster
            }
          });

          buttons.push(subButton);
          subButtons.push(subButton);
        }
      });
    },
    onAdd(evt) {
      viewer = evt.target;
      target = `${viewer.getMain().getMapTools().getId()}`;// Placerar komponenten i BottomTools
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
      document.getElementById(target).appendChild(el);

      // För att få det verkliga HTML-elementet:
      const containerElementElement = document.getElementById(containerElement.getId());

      // Renderar mapviewlistMainButton
      htmlString = mapviewlistMainButton.render();
      el = Origo.ui.dom.html(htmlString);
      containerElementElement.appendChild(el);

      // Renderar subButtons
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
