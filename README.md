# Linear Path

This component creates a linear path view from a _picklist_ field.

![linear path example](assets/linear_path_example.png?raw=true)

## Usage

Define the `modal_confirmation` component in a custom component markup:

```xml
<aura:component>

    <c:linear_path fieldName="Status" 
                   recordId="{!v.recordId}" 
                   scale="true"/>

</aura:component>
```

## Properties

- `fieldName` _(String)_ - Name of the picklist field to display.
- `recordId` _(String)_ - Id of the record to use.
- `scale` _(Boolean)_ - Default value is _false_. Indicates whether the path will be scaled down to fit in its container.


###### NOTES &amp; CONSIDERATIONS

I _scale_ is set to false, content will be hidden if it doesn't fit in the container, otherwise it will scale down to fit in the available space.

It has special management for the _StageName_ field in the `Opportunity` object, so it won't show the _closed_ values, instead it will display just _Close_.

Current version has no functionality, just displayes the picklist values.


###### DISCLAIMER

This component is based on the [Path Blueprint](https://lightningdesignsystem.com/components/path/) from the Lightning Design System.
