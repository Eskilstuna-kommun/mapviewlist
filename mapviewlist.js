import 'Origo';

const Mapviewlist = function Mapviewlist(options = {}) {
  const {
    links = [],
    dividerStyle = 'border-top: 1px dashed rgb(0,153,255)', // ~origo blue web safe
    headerTitle = '',
    headerIcon = '#ic_chevron_right_24px'
  } = options;
  let mapMenu;

  function createCollapseHeader() {
    const headerButton = Origo.ui.Button({
      cls: 'icon-smaller compact no-grow o-tooltip',
      icon: headerIcon,
      iconCls: 'rotate',
      style: {
        'align-self': 'flex-end'
      }
    });

    const headerTitleCmp = Origo.ui.Component({
      render() {
        return `<div id="${this.getId()}" class="grow padding-left">${headerTitle}</div>`;
      }
    });

    return Origo.ui.Component({
      onRender() {
        const el = document.getElementById(this.getId());
        el.addEventListener('click', () => {
          const customEvt = new CustomEvent('collapse:toggle', {
            bubbles: true
          });
          el.blur();
          el.dispatchEvent(customEvt);
        });
      },
      render() {
        return `<li id="${this.getId()}" class="flex row align-center padding-x padding-y-smaller hover pointer collapse-header" style="width: 100%;">
                  ${headerButton.render()}
                  ${headerTitleCmp.render()}
                </li>`;
      }
    });
  }

  function createLinkItem(linkProperties) {
    const linkIconCmp = Origo.ui.Icon({
      cls: 'icon-smaller compact no-grow',
      icon: linkProperties.icon || './img/png/void.png'
    });

    const linkTextCmp = Origo.ui.Element({
      cls: 'grow padding-left',
      innerHTML: linkProperties.title
    });

    return Origo.ui.Component({
      onRender() {
        const el = document.getElementById(this.getId());
        el.addEventListener('click', () => {
          mapMenu.close();
          window.location.href = linkProperties.url;
        });
      },
      render() {
        return `<li id="${this.getId()}" class="flex row align-center padding-x padding-y-smaller hover pointer">
        ${linkIconCmp.render()}
        ${linkTextCmp.render()}
      </li>`;
      }
    });
  }

  function createDividerItem() {
    return Origo.ui.Component({
      render() {
        return `<hr id="${this.getId()}" style='${dividerStyle}'/>`;
      }
    });
  }

  function createCollapseContent() {
    return Origo.ui.Component({
      onInit() {
        links.forEach(linkProps => {
          if (linkProps.title === 'divider') {
            this.addComponent(createDividerItem());
          } else {
            this.addComponent(createLinkItem(linkProps));
          }
        });
      },
      renderItems() {
        let linkItems = '';
        this.getComponents().forEach(contentCmp => {
          linkItems += contentCmp.render();
        });
        return linkItems;
      },
      render() {
        return `<ul id ="${this.getId()}" class="list margin-left">
                ${this.renderItems()}
              </ul>`;
      },
      onRender() {
        this.dispatch('render');
      }
    });
  }

  return Origo.ui.Component({
    name: 'mapviewlist',
    onAdd(e) {
      const viewer = e.target;
      mapMenu = viewer.getControlByName('mapmenu');

      const collapseCmp = Origo.ui.Collapse({
        headerComponent: createCollapseHeader(),
        contentComponent: createCollapseContent(),
        collapseX: false,
        contentStyle: 'max-height: 300px; overflow-y: auto'
      });

      mapMenu.appendMenuItem(collapseCmp);
      collapseCmp.onRender();
    }


  });
};

export default Mapviewlist;
