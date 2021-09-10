/**
 * This file is for DD using specifically. And DD is the abbreviation of Direct Dialogue, which is the street colleagues of Greenpeace.
 * The differences between normal page and DD page are as follows:
 * - normal page would show the `Donate Button`；DD page would hide the `Donate Button`.
 *	 You can call hide_donate_btn() to implement this attribute.
 * - normal page requires to fill in the MobilePhone field；DD page doesn't require to fill in the MobilePhone field forcibly.
 *	 You can call phone_not_required() to implement this attribute.
 * - normal page has no QR code；DD page would display the LINE QR code.
 *	 You can call line_QR_code() to implement this attribute.
 *
 * Import this `utm_source_dd.js` will automatically execute the following things:
 * in the DD page: 
 * - the elements that have the class `is-hidden-at-dd-page-only` will be hidden, and you should put this class in the donate buttons.
 * - the elements that have the class `is-shown-at-dd-page-only` will be shawn.
 * - if there is an input element which id is `MobilePhone`, then the `required` Attribute will be removed.
 *
 * This file use the current URL to distinguish the DD page.
 * The DD page should have URL like this: xxx?utm_source=dd
 */
(() => {
	if (window.location.href.indexOf("utm_source=dd") >= 0) {
		let style = document.createElement('style');
		style.innerHTML =
			`.is-hidden-at-dd-page-only {
				display: none !important;
			}
			.is-shown-at-dd-page-only {
				display: block !important;
			}`
		;
		document.head.appendChild(style);
			
		if (document.querySelector('#MobilePhone'))
			document.querySelector('#MobilePhone').removeAttribute("required");
	} else { // not in the DD page
		let style = document.createElement('style');
		style.innerHTML =
			`
			.is-shown-at-dd-page-only {
				display: none !important;
			}`
		;
		document.head.appendChild(style);
	}
})();

/**
 * Call this function to remove the `required` Attribute of phone field from DD page.
 * So on the DD page, you don't need to fill in the phone field forcibly.
 * Expected parameter: the element Id of phone field.
 */
export const phone_not_required = (elementId) => {
	if (window.location.href.indexOf("utm_source=dd") >= 0) {
		let element_id = elementId;
		if (element_id.indexOf('#') < 0) {
			element_id = '#' + element_id;
		}
		document.querySelector(element_id).removeAttribute("required");
	}
}

/**
 * Call this function to hide the donate button from DD page.
 * Expected parameter: the element Id of donate button.
 */
export const hide_donate_btn = (elementId) => {
	if (window.location.href.indexOf("utm_source=dd") >= 0) {
		let element_id = elementId;
		if (element_id.indexOf('#') < 0) {
			element_id = '#' + element_id;
		}
		document.querySelector(element_id).style.display = 'none';
	}
}

/**
 * Call this function to generate QR cde on DD page. 
 * It would generates the tp/tc/ks QR code according to the utm_content parameter of url, for example: xxx?XXX&utm_content=tp
 * Expected parameter: the element Id that can contain QR code.
 * For example: you have a div element on DD page: `<div id="QR-code-block"></div>`
 * and you can generate QR code in this div through calling this function: `line_QR_code('QR-code-block')`
 */
export const line_QR_code = (elementId) => {		
	if (window.location.href.indexOf("utm_source=dd") >= 0) {		
		let line_block_id = elementId;
		
		if (line_block_id.indexOf('#') < 0) {
			line_block_id = '#' + line_block_id;
		}		

		document.querySelector(line_block_id).innerHTML =
			`<div class="line-div is-show-at-dd-page-only" style="text-align: center; margin: 1.5rem 0;">				
				<div class="line-tp">
					<a href='http://act.gp/GPLINE_tp' target='_blank' style='color: #00c300; text-decoration: none;'>加入我們的 LINE 好友<br>
					<img src="https://change.greenpeace.org.tw/2021/petition/example/images/act.gp_GPLINE_tp.png" style="width:100%; max-width:256px;" /></a>
				</div>
				<div class="line-tc">
					<a href='http://act.gp/GPLINE_tc' target='_blank' style='color: #00c300; text-decoration: none;'>加入我們的 LINE 好友<br>
					<img src="https://change.greenpeace.org.tw/2021/petition/example/images/act.gp_GPLINE_tc.png" style="width:100%; max-width:256px;" /></a>
				</div>
				<div class="line-ks">
					<a href='http://act.gp/GPLINE_ks' target='_blank' style='color: #00c300; text-decoration: none;'>加入我們的 LINE 好友<br>
					<img src="https://change.greenpeace.org.tw/2021/petition/example/images/act.gp_GPLINE_ks.png" style="width:100%; max-width:256px;" /></a>
				</div>
			</div>`;
		
		if (window.location.href.indexOf("utm_content=tp") >= 0) {
			document.querySelector('.line-tp').style.display = "block";
			document.querySelector('.line-tc').style.display = "none";
			document.querySelector('.line-ks').style.display = "none";
		} else if (window.location.href.indexOf("utm_content=tc")) {
			document.querySelector('.line-tp').style.display = "none";
			document.querySelector('.line-tc').style.display = "block";
			document.querySelector('.line-ks').style.display = "none";		
		} else {
			document.querySelector('.line-tp').style.display = "none";
			document.querySelector('.line-tc').style.display = "none";
			document.querySelector('.line-ks').style.display = "block";
		}
	}
}