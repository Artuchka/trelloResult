;(() => {
	"use strict"
	const t = {
		randomUUID:
			"undefined" != typeof crypto &&
			crypto.randomUUID &&
			crypto.randomUUID.bind(crypto),
	}
	let e
	const n = new Uint8Array(16)
	function o() {
		if (
			!e &&
			((e =
				"undefined" != typeof crypto &&
				crypto.getRandomValues &&
				crypto.getRandomValues.bind(crypto)),
			!e)
		)
			throw new Error(
				"crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
			)
		return e(n)
	}
	const r = []
	for (let t = 0; t < 256; ++t) r.push((t + 256).toString(16).slice(1))
	const a = function (e, n, a) {
			if (t.randomUUID && !n && !e) return t.randomUUID()
			const c = (e = e || {}).random || (e.rng || o)()
			if (((c[6] = (15 & c[6]) | 64), (c[8] = (63 & c[8]) | 128), n)) {
				a = a || 0
				for (let t = 0; t < 16; ++t) n[a + t] = c[t]
				return n
			}
			return (function (t, e = 0) {
				return (
					r[t[e + 0]] +
					r[t[e + 1]] +
					r[t[e + 2]] +
					r[t[e + 3]] +
					"-" +
					r[t[e + 4]] +
					r[t[e + 5]] +
					"-" +
					r[t[e + 6]] +
					r[t[e + 7]] +
					"-" +
					r[t[e + 8]] +
					r[t[e + 9]] +
					"-" +
					r[t[e + 10]] +
					r[t[e + 11]] +
					r[t[e + 12]] +
					r[t[e + 13]] +
					r[t[e + 14]] +
					r[t[e + 15]]
				).toLowerCase()
			})(c)
		},
		c = document.querySelector("template#list"),
		s = document.querySelector("template#task"),
		l = document.querySelector("[data-listContainer]"),
		d = document.querySelector("[data-addListBtn]")
	function i(t = "list title") {
		const e = c.content.cloneNode(!0),
			n = e.querySelector("[data-title]")
		n.value = t
		const o = e.querySelector("[data-taskList]")
		return (
			e
				.querySelector("[data-input]")
				.addEventListener("keydown", function (t) {
					;("Enter" != t.key && 13 != t.keyCode) ||
						(u(o, { text: this.value, id: a() }),
						(this.value = null),
						p())
				}),
			n.addEventListener("input", (t) => {
				m(n), p()
			}),
			o.addEventListener("contextmenu", (t) => {
				t.preventDefault(),
					t.target.matches(".task") && t.target.remove(),
					p()
			}),
			(o.ondrop = y),
			(o.ondragover = f),
			(o.ondragleave = g),
			l.append(e),
			m(n),
			o
		)
	}
	function u(t, e) {
		const n = s.content.cloneNode(!0),
			o = n.querySelector(".task")
		;(o.querySelector("[data-info]").textContent = e.text),
			(o.id = e.id),
			o.addEventListener("dragstart", (t) =>
				(function (t) {
					t.dataTransfer.setData("text/plain", t.target.id)
				})(t)
			),
			t.append(n)
	}
	function p() {
		const t = Array.from(document.querySelectorAll(".list")).map((t) => {
			const e = Array.from(t.querySelectorAll(".task > span[data-info]")),
				n = t.querySelector("[data-title]").value
			return (
				console.log(n),
				{
					listTitle: n,
					tasks: e.map(
						(t) => (
							console.log(t.parentNode.id),
							{ text: t.textContent, id: t.parentNode.id }
						)
					),
				}
			)
		})
		console.log(t),
			localStorage.setItem("TASKS_APP_INFO", JSON.stringify(t))
	}
	function f(t) {
		t.preventDefault(), t.target.classList.add("dragover")
	}
	function g(t) {
		t.preventDefault(), t.target.classList.remove("dragover")
	}
	function y(t) {
		t.preventDefault(), t.target.classList.remove("dragover")
		const e = t.dataTransfer.getData("text/plain")
		t.target.append(document.getElementById(e)), p()
	}
	function m(t) {
		;(t.style.height = "1px"),
			(t.style.height = `calc(1px * ${t.scrollHeight})`)
	}
	!(function () {
		const t = JSON.parse(localStorage.getItem("TASKS_APP_INFO"))
		console.log(t),
			t &&
				t.forEach((t) => {
					const e = i(t.listTitle)
					t.tasks.forEach((t) => {
						u(e, t)
					})
				})
	})(),
		"" === l.innerHTML && i("Awesome List"),
		d.addEventListener("click", (t) => {
			i("new list")
		})
})()
