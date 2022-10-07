const elSelectNative = document.getElementsByClassName("js-selectNative")[0];
const elSelectCustom = document.getElementsByClassName("js-selectCustom")[0];
const elSelectCustomBox = elSelectCustom.children[0];
const elSelectCustomOpts = elSelectCustom.children[1];
const customOptsList = Array.from(elSelectCustomOpts.children);
const optionsCount = customOptsList.length;
const defaultLabel = elSelectCustomBox.getAttribute("data-value");
const selectorOptions = document.getElementsByClassName("selectCustom-option");

for (let i = 0; i <= selectorOptions.length - 1; i++) {
  selectorOptions[i].addEventListener("click", () => {
    const selectCustomTrigger = document.getElementsByClassName(
      "selectCustom-trigger--invalid"
    )[0];

    if (selectCustomTrigger) {
      selectCustomTrigger.classList.remove("selectCustom-trigger--invalid");
    }
  });
}

let optionChecked = "";
let optionHoveredIndex = -1;

elSelectCustomBox.addEventListener("click", (e) => {
  const isClosed = !elSelectCustom.classList.contains("isActive");

  if (isClosed) {
    openSelectCustom();
  } else {
    closeSelectCustom();
  }
});

function openSelectCustom() {
  elSelectCustom.classList.add("isActive");
  elSelectCustom.setAttribute("aria-hidden", false);

  if (optionChecked) {
    const optionCheckedIndex = customOptsList.findIndex(
      (el) => el.getAttribute("data-value") === optionChecked
    );
  }

  document.addEventListener("click", watchClickOutside);
  document.addEventListener("keydown", supportKeyboardNavigation);
}

function closeSelectCustom() {
  elSelectCustom.classList.remove("isActive");

  elSelectCustom.setAttribute("aria-hidden", true);

  document.removeEventListener("click", watchClickOutside);
  document.removeEventListener("keydown", supportKeyboardNavigation);
}

function updateCustomSelectChecked(value, text) {
  const prevValue = optionChecked;

  const elPrevOption = elSelectCustomOpts.querySelector(
    `[data-value="${prevValue}"`
  );
  const elOption = elSelectCustomOpts.querySelector(`[data-value="${value}"`);

  if (elPrevOption) {
    elPrevOption.classList.remove("isActive");
  }

  if (elOption) {
    elOption.classList.add("isActive");
  }

  elSelectCustomBox.textContent = text;
  optionChecked = value;
}

function watchClickOutside(e) {
  const didClickedOutside = !elSelectCustom.contains(event.target);
  if (didClickedOutside) {
    closeSelectCustom();
  }
}

function supportKeyboardNavigation(e) {
  if (event.keyCode === 40 && optionHoveredIndex < optionsCount - 1) {
    let index = optionHoveredIndex;
    e.preventDefault();
  }

  if (event.keyCode === 38 && optionHoveredIndex > 0) {
    e.preventDefault();
  }

  if (event.keyCode === 13 || event.keyCode === 32) {
    e.preventDefault();

    const option = elSelectCustomOpts.children[optionHoveredIndex];
    const value = option && option.getAttribute("data-value");

    if (value) {
      elSelectNative.value = value;
      updateCustomSelectChecked(value, option.textContent);
    }
    closeSelectCustom();
  }

  if (event.keyCode === 27) {
    closeSelectCustom();
  }
}

elSelectNative.addEventListener("change", (e) => {
  const value = e.target.value;
  const elRespectiveCustomOption = elSelectCustomOpts.querySelectorAll(
    `[data-value="${value}"]`
  )[0];

  updateCustomSelectChecked(value, elRespectiveCustomOption.textContent);
});

customOptsList.forEach(function (elOption, index) {
  elOption.addEventListener("click", (e) => {
    const value = e.target.getAttribute("data-value");
    const activeInSelector = document.querySelector(".selectCustom-trigger");

    activeInSelector.classList.add("selectCustom-trigger--active");

    elSelectNative.value = value;
    updateCustomSelectChecked(value, e.target.textContent);
    closeSelectCustom();
  });
});
