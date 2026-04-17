# mapviewlist
Provides a list of links that enables you to browse to existing views.
The current views icon is always the one that shows in the main button, and the rest of the icons that are declared as links is shown as subbuttons in a grid with 6 columns expanded to the right.
Works as a plugin. Instructions to follow.

#### Example usage of mapviewlist as plugin

This plugin (all three files of build/ after it has been built) expects to be put in a subfolder of the plugins/ folder of an origo instance (if there is no plugins folder it can be created) called 'mvl'.
Then you configure the index.html like in the example.


The plugin can be loaded like this:
```html
<link href="plugins/mvl/mapviewlist.css" rel="stylesheet">

..

<script src="js/origo.min.js"></script>
<script src="plugins/mvl/mvl.js"></script>
<script type="text/javascript">
var origo = Origo('index.json');
origo.on('load', function(viewer) {
	const mapviewlist = Mapviewlist({
		links: [
			{
				title: 'Map-1',
				url: 'URL to mapview-1',
				buttonImage: 'map1.png'
			},
			{
				title: 'Map-2',
				url: 'URL to mapview-2',
				buttonImage: 'map2.png'
			},
			{
				title: 'Map-3',
				url: 'URL to mapview-3',
				buttonImage: 'map3.png'
			},
			{
				title: 'Map-4',
				url: 'URL to mapview-4',
				buttonImage: 'map4.png'
			},
			{
				title: 'Map-5',
				url: 'URL to mapview-5',
				buttonImage: 'map5.png'
			}
		],
	});
	viewer.addComponent(mapviewlist)    
    	});
</script>
```
(The links can also be placed in a separate .json and loaded via index.html prior to creating an instance of the plugin)

