var chatUrl = "";
var chatBaseUrl = "";

function ChatBot(options) {
	this.options = {
		serverUrl: "http://localhost:8080/chatbot-desa/",
		widgetName: "w-chat-ChatBot",
		lang: "es",
		template: "default",
		chatFolder: ""
	};

	this.inArray = function (needle, haystack) {
		for (var i in haystack) {
			if (haystack[i] == needle) return true;
		}
		return false;
	}

	this.processOptions = function (options) {

		for (var key in options) {
			this.options[key] = options[key];
		}

		this.url = "";

		for (var key in this.options) {
			this.url += key + "=" + this.options[key] + "&";
		}

		if (this.options.targetID) {
			this.options.targetOriginal = this.options.targetID;
			this.options.target = document.getElementById(this.options.targetID);
			if (!this.options.target)
				return false;
		} else {
			return false;
		}

		return true;
	}

	this.addContainer = function () {
		this.options.targetID += "_content";
		this.options.target.innerHTML = '<div id="' + this.options.targetID + '" class="chatBot" style="display:none">' +
			'</div>';
		this.options.target = document.getElementById(this.options.targetID);
	}

	this.showError = function (msg) {

		console.log(msg);

		if (this.options.onError == "showMessage") {
			document.getElementById(this.options.targetID).classList.add("errorChat");
		} else {
			document.getElementById(this.options.targetOriginal).innerHTML = '';
		}
	}

	this.callServer = function () {

		var self = this;

		var xhttp = new XMLHttpRequest();
		//console.log(xhttp);
		xhttp.onreadystatechange = function () {
			if (xhttp.readyState == 4) {
				if (xhttp.status != 200) {

					return self.showError("Error " + xhttp.status);
				}

				self.response = xhttp.response;
				//console.log("response = " + self.response)

				try {
					//alert("jason")
					self.jsonResponse = JSON.parse(self.response);
				} catch (e) {
					//alert("exception")
					return self.showError("Error en el JSON");
				}

				if (self.jsonResponse.error != 0) {
					//alert("jason no es 0")
					return self.showError(self.jsonResponse.errorMsg);
				} else {
					//alert("proces response")
					self.processResponse();
				}
			}
		};

		xhttp.open("POST", this.options.serverUrl + "proxy.php", true);
		//console.log(this.options.serverUrl + "proxy.php");
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(this.url);
		//alert(this.url);
	}

	this.setInnerHtml = function (elm, html) {
		elm.innerHTML += html;
		Array.from(elm.querySelectorAll("script")).forEach(function (el) {
			let newEl = document.createElement("script");
			Array.from(el.attributes).forEach(function (el) {
				newEl.setAttribute(el.name, el.value);
			});
			newEl.appendChild(document.createTextNode(el.innerHTML));
			el.parentNode.replaceChild(newEl, el);
		});
	}

	this.processResponse = function () {

		this.setInnerHtml(document.getElementById(this.options.targetID), this.jsonResponse.tpl);
	}

	if (this.processOptions(options)) {
		this.addContainer();
		this.callServer();
	} else {
		this.showError("Error procesando las opciones");
	}

	return this;
}