/* eslint-disable */
//@ts-nocheck
import { useEffect } from "react";

const useScript_V2 = (url: string): void => {
	useEffect(() => {
		var w = window.innerWidth,
			h = window.innerHeight,
			canvas = document.getElementById("canvas"),
			ctx = canvas.getContext("2d"),
			rate = 60,
			arc = 100,
			time,
			count,
			size = 7,
			speed = 20,
			parts = new Array(),
			// colors = ['red', '#f57900', 'yellow', '#ce5c00', '#5c3566'];
			colors = ["#9d4edd", "#9d4edd", "#9d4edd", "#9d4edd", "#9d4edd"];

		var mouse = { x: 0, y: 0 };

		canvas.setAttribute("width", w);
		canvas.setAttribute("height", h);

		function create() {
			time = 0;
			count = 0;

			for (var i = 0; i < arc; i++) {
				parts[i] = {
					x: Math.ceil(Math.random() * w),
					y: Math.ceil(Math.random() * h),
					toX: Math.random() * 5 - 1,
					toY: Math.random() * 2 - 1,
					c: colors[Math.floor(Math.random() * colors.length)],
					size: Math.random() * size,
				};
			}
		}

		function particles() {
			ctx.clearRect(0, 0, w, h);
			canvas.addEventListener("mousemove", MouseMove, false);
			for (var i = 0; i < arc; i++) {
				var li = parts[i];
				var distanceFactor = DistanceBetween(mouse, parts[i]);
				var distanceFactor = Math.max(
					Math.min(15 - distanceFactor / 10, 10),
					1
				);
				ctx.beginPath();
				ctx.arc(li.x, li.y, li.size * distanceFactor, 0, Math.PI * 2, false);
				ctx.fillStyle = li.c;
				ctx.strokeStyle = li.c;
				if (i % 2 == 0) ctx.stroke();
				else ctx.fill();

				li.x = li.x + li.toX * (time * 0.05);
				li.y = li.y + li.toY * (time * 0.05);

				if (li.x > w) {
					li.x = 0;
				}
				if (li.y > h) {
					li.y = 0;
				}
				if (li.x < 0) {
					li.x = w;
				}
				if (li.y < 0) {
					li.y = h;
				}
			}
			if (time < speed) {
				time++;
			}
			setTimeout(particles, 1000 / rate);
		}

		function MouseMove(e) {
			mouse.x = e.layerX;
			mouse.y = e.layerY;
		}
		function DistanceBetween(p1, p2) {
			var dx = p2.x - p1.x;
			var dy = p2.y - p1.y;
			return Math.sqrt(dx * dx + dy * dy);
		}
		create();
		particles();
	}, [url]);
};

export default useScript_V2;
