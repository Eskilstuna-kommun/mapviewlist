# mapviewlist
Provides a list of links that enables you to browse to existing views.
The current views icon is always the one that shows in the main button, and the rest of the icons that are declared as links is shown as subbuttons in a grid with 6 columns expanded to the right.
Works as a plugin. Instructions to follow.

#### Example usage of mapviewlist as plugin

First you have to create a subfolder in the Origo-map directory named plugins/ where you can put the built version of mapviewlist.
Then you configure the index.html like in the example.


The plugin can be loaded like this in an html-file:
```html
<link href="plugins/mapviewlist.css" rel="stylesheet">

..

<script src="js/origo.min.js"></script>
<script src="plugins/mvl.js"></script>
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

