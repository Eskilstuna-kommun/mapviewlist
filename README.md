# mapviewlist
Provides a list of links that enables you to browse to existing views.
Works as a plugin. Instructions to follow.

#### Example usage of mapviewlist as plugin

First you have to create a subfolder in the Origo-map directory named plugins/ where you can put the built version of mapviewlist.
Then you configure the index.html like in the example.


The plugin can be loaded like this in an html-file:
```
<script src="js/origo.min.js"></script>
<script src="plugins/mvl.js"></script>
<script type="text/javascript">
var origo = Origo('index.json');
origo.on('load', function(viewer) {
	var mapviewlist = Mapviewlist({
		links: [
			{
				title: 'Map-1',
				url: 'URL to mapview-1',
				icon: 'map1.png'
			},
			{
				title: 'Map-2',
				url: 'URL to mapview-2',
				icon: 'map2.png'
			},
			{
				title: 'Map-3',
				url: 'URL to mapview-3'
			},
			{
				title: 'Map-4',
				url: 'URL to mapview-4',
				icon: 'map4.png'
			},
			{
				title: 'Map-5',
				url: 'URL to mapview-5'
			}
		],
		headerTitle: 'Mapviews',
		headerIcon: '#ic_chevron_right_24px'
	});
	viewer.addComponent(mapviewlist)    
            });
        </script>
```

