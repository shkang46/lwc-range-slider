LWC Range Slider
==

## Intro
Standard component인 lightning-slider가 하나의 변수에 대해서만 지원하기 때문에, 2개 변수를 사용해 범위 조절이 가능한 커스텀 slider를 구현하였음. <br>
<br>

## Attribute

|Name|Type|Default|Description|
|---|---|---|---|
|`min`|number|0|
|`max`|number|100|
|`left`|number|0|작은 값의 초기값|
|`right`|number|100|큰 값의 초기값|
|`step`|number|0||
|`allowZeroRange`|boolean|false|`true`로 지정하면 left와 right가 같아질 수 있음|
<br>

## Method
|Name|Parameter|
|---|---|
|setLeft|`value` (number)|
|setRight|`value` (number)|
<br>

## Event
|Name|Payload|
|---|---|
|`sliderinput`|`detail`: {`left`,`right`}|
<br>

## Usage
```html
<c-range-slider
            min={min}
            max={max}
            left={left}
            right={right}
            step={step}
            allow-zero-range=true
            onsliderinput={handleInput}
></c-range-slider>
```

```js
handleInput(event) {
    this.left = event.detail.left;
    this.right = event.detail.right;
}
```
