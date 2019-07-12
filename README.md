# React Dynamic Context Menu

React Dynamic Context menu provides an easy way to add right click functionality to React components.

## Props
| Name | Type | Usage |
| --- | --- | --- |
| menuItems | Array of `Objects` | The items that appear on the menu when the context menu is shown |
| data | `Object` | The data passed in as the first argument to the `onClick` function. |
| ignoreClickEvents (optional) | Single or Array of `refs` | Refs of elements that won't close the menu when clicked.

## Basic usage
To use the `DynamicContextMenu` wrap the element you want to be clickable.

```jsx
const menu = [
	{
		label: 'Save'
		onClick: this.handleSave
	},
	{
		label: 'Delete'
		onClick: this.handleDelete
		className: 'danger'
	}
]

...

<DynamicContextMenu
	menuItems={menu}
	data={rowData}
>
	<p>Right click this row!</p>
</DynamicContextMenu>
```

### Data
Whatever is passed into as the `data` prop will be used as the first argument when the `onClick` function is called.


### Menu Items
```js
[
	{
		label: 'Save'
		onClick: this.handleSave
	},
	{
		label: 'Delete'
		onClick: this.handleDelete
		className: 'danger'
	}
]
```

As you can see menu items can have 3 properties. They are:

| Name | Description |
| --- | --- |
| Label | The text are appears on the menu item |
| onClick | The callback that is called when the menu item is clicked. The first argument of the method is the data passed in to the `data` on the `DynamicContextMenu`. |
| className (optional)| The class name of the menu item `div`. |
| onContextMenu (optional)| A valid function ran after the menu has opened. |
