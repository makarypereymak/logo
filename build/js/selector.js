const elSelectNative=document.getElementsByClassName("js-selectNative")[0],elSelectCustom=document.getElementsByClassName("js-selectCustom")[0],elSelectCustomBox=elSelectCustom.children[0],elSelectCustomOpts=elSelectCustom.children[1],customOptsList=Array.from(elSelectCustomOpts.children),optionsCount=customOptsList.length,defaultLabel=elSelectCustomBox.getAttribute("data-value"),selectorOptions=document.getElementsByClassName("selectCustom-option");for(let e=0;e<=selectorOptions.length-1;e++)selectorOptions[e].addEventListener("click",(()=>{const e=document.getElementsByClassName("selectCustom-trigger--invalid")[0];e&&e.classList.remove("selectCustom-trigger--invalid")}));let optionChecked="",optionHoveredIndex=-1;function openSelectCustom(){if(elSelectCustom.classList.add("isActive"),elSelectCustom.setAttribute("aria-hidden",!1),optionChecked){customOptsList.findIndex((e=>e.getAttribute("data-value")===optionChecked))}document.addEventListener("click",watchClickOutside),document.addEventListener("keydown",supportKeyboardNavigation)}function closeSelectCustom(){elSelectCustom.classList.remove("isActive"),elSelectCustom.setAttribute("aria-hidden",!0),document.removeEventListener("click",watchClickOutside),document.removeEventListener("keydown",supportKeyboardNavigation)}function updateCustomSelectChecked(e,t){const o=optionChecked,s=elSelectCustomOpts.querySelector(`[data-value="${o}"`),l=elSelectCustomOpts.querySelector(`[data-value="${e}"`);s&&s.classList.remove("isActive"),l&&l.classList.add("isActive"),elSelectCustomBox.textContent=t,optionChecked=e}function watchClickOutside(e){!elSelectCustom.contains(event.target)&&closeSelectCustom()}function supportKeyboardNavigation(e){if(40===event.keyCode&&optionHoveredIndex<optionsCount-1){e.preventDefault()}if(38===event.keyCode&&optionHoveredIndex>0&&e.preventDefault(),13===event.keyCode||32===event.keyCode){e.preventDefault();const t=elSelectCustomOpts.children[optionHoveredIndex],o=t&&t.getAttribute("data-value");o&&(elSelectNative.value=o,updateCustomSelectChecked(o,t.textContent)),closeSelectCustom()}27===event.keyCode&&closeSelectCustom()}elSelectCustomBox.addEventListener("click",(e=>{!elSelectCustom.classList.contains("isActive")?openSelectCustom():closeSelectCustom()})),elSelectNative.addEventListener("change",(e=>{const t=e.target.value;updateCustomSelectChecked(t,elSelectCustomOpts.querySelectorAll(`[data-value="${t}"]`)[0].textContent)})),customOptsList.forEach((function(e,t){e.addEventListener("click",(e=>{const t=e.target.getAttribute("data-value");document.querySelector(".selectCustom-trigger").classList.add("selectCustom-trigger--active"),elSelectNative.value=t,updateCustomSelectChecked(t,e.target.textContent),closeSelectCustom()}))}));