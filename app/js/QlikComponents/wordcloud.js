/* WARNING!!
This goes against my better judgement, never ever use a wordcloud.
They are horrible for visualization and I have sold my soul to the devil.
 */

function WordCloud(dimension, expression, element) {

	var cube;

	var w = element.offsetWidth;
	var h = element.offsetWidth;

	var svg = d3.select(element).append("svg")
		.attr("id", "svgwordcloud");

	var max,
		min,
		scale = 1,
		fontSize,
		maxFont = 32;

	QIX.app.createSessionObject({
		"qInfo": {
			"qId": "",
			"qType": "HyperCube"
		},
		"qHyperCubeDef": {
			"qDimensions": [{
				"qNullSuppression": true,
				"qDef": {
					"qFieldDefs": [dimension]
				}
			}],
			"qMeasures": [{
				"qLibraryId": "",
				"qSortBy": {
					"qSortByNumeric": -1
				},
				"qDef": {
					"qLabel": "",
					"qDescription": "",
					"qDef": expression
				}
			}],
			"qInterColumnSortOrder": [1, 0],
			"qInitialDataFetch": [{
				qTop: 0,
				qLeft: 0,
				qHeight: 40,
				qWidth: 2
			}]
		}
	}).then(function(reply) {
		cube = reply;
		render();
	});

	function render() {
		cube.getLayout().then(function(layout) {
			svg.attr("width", w).attr("height", h);
			svg.selectAll('text').remove();

			if(layout.qHyperCube.qDataPages[0].qMatrix[0][0].qIsEmpty) {
				return;
			}

			var maxCharCount = layout.qHyperCube.qDimensionInfo[0].qApprMaxGlyphCount;
			max = d3.max(layout.qHyperCube.qDataPages[0].qMatrix.map(function(d) {
				return d[1].qNum;
			}));
			min = d3.min(layout.qHyperCube.qDataPages[0].qMatrix.map(function(d) {
				return d[1].qNum;
			}));

			var fontSize = d3.scale.log().range([16, maxFont]);
			fontSize.domain([min, max]);

			var opacityScale = d3.scale.linear().range([60, 100]).domain([min, max]);

			var data = layout.qHyperCube.qDataPages[0].qMatrix.map(function(d) {
				return {
					key: d[0].qText,
					size: d[1].qNum,
					value: d[1].qNum,
					qElem: d[0].qElemNumber
				}
			});

			var background = svg.append("g"),
				vis = svg.append("g")
				.attr("transform", "translate(" + [w >> 1, h >> 1] + ")");

			var wordlayout = d3.layout.cloud()
				.words(data)
				.timeInterval(10)
				.padding(2)
				.size([w, h])
				.fontWeight('bold')
				.spiral('rectangular')
				.font('Impact')
				.fontSize(function(d) {
					if (layout.qHyperCube.qDataPages[0].qMatrix.length != 1) {
						return fontSize(+d.size);
					} else {
						return maxFont;
					}
				})
				.rotate(function() {
					return 0;
				})
				.text(function(d) {
					return d.key;
				})
				.on("end", draw)
				.start();

			function draw(data, bounds, qv) {
				scale = bounds ? Math.min(
					w / Math.abs(bounds[1].x - w / 2),
					w / Math.abs(bounds[0].x - w / 2),
					h / Math.abs(bounds[1].y - h / 2),
					h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;

				var text = vis.selectAll("text")
					.data(data, function(d) {
						return d.text;
					});
				text.transition()
					.duration(1000)
					.attr("transform", function(d) {
						return "translate(" + [d.x, d.y] + ")";
					})
					.style("font-size", function(d) {
						return fontSize(d.value) + "px";
					});
				text.enter().append("text")
					.on("click", function(d) {
						select(d.qElem);
					})
					.attr("class", "hash")
					.attr("text-anchor", "middle")
					.attr("transform", function(d) {
						return "translate(" + [d.x, d.y] + ")";
					})
					.style("font-size", function(d) {
						return d.size + "px";
					})
					.style("cursor", "pointer")
					.style('opacity', function(d) {
						return layout.qHyperCube.qDataPages[0].qMatrix.length > 1 ? opacityScale(d.value) / 100 : 1;
					})
					.style("fill", 'rgb(39, 48, 81)')
					.text(function(d) {
						return d.text;
					});
					//orange #FE8D0B
			}


		})
	}


	function resize() {
		if(w === element.offsetWidth) {
			return;
		}

		w = element.offsetWidth;
		h = element.offsetHeight;

		render();
	};

	function select(qElem) {
		cube.selectHyperCubeValues('/qHyperCubeDef', 0, [qElem], true).then(function(success) {
			pubsub.publish('update');
		})
	}

	pubsub.subscribe('update', render);
	//pubsub.subscribe('resize', resize);

};