# Linear Path

This component creates a linear path view from a _picklist_ field in any object in Salesforce and allow to scale down the component to fit in its parent container.

![linear path example](assets/linear_path_example.png?raw=true)

## Usage

Define the `linear_path` component in a custom component markup:

```xml
<aura:component>

    <c:linear_path fieldName="StageName" 
                   recordId="{!v.recordId}" 
                   scale="true"/>

</aura:component>
```

The component is available in the lightning page designer, so it can be added to any record page without writting any code.

## Properties

- `fieldName` _(String)_ - Name of the picklist field to display.
- `recordId` _(String)_ - Id of the record to use.
- `scale` _(Boolean)_ - Default value is _false_. Indicates whether the path will be scaled down to fit in its container.


###### NOTES &amp; CONSIDERATIONS

If _scale_ is set to false, content will be hidden if it doesn't fit in the container, otherwise it will scale down to fit in the available space.

It has special management for the _StageName_ field in the `Opportunity` object (try to mimic it), so it won't show the _closed_ values, instead it will display just _Close_, unless the Opportunity it is closed, it will then show the _StageName_ value, same as the generic Lightning Path component.

Current version has no functionality, just displayes the picklist values.

###### DIFFERENCES WITH THE PATH COMPONENT

This component is for display purposes only of the picklist, it does not contain the _Mark Stage as Complete_ button and does not display the _StageName_.

In the image below:
- First is the `Path` component showing the path updated button.
- Second is the `Path` component hiding the path update button.
- Trhis is the `Linear Path` component, without the update button and the _Stage Name_ label.

![linear path example](assets/linear_path_comparison.png?raw=true)

###### DISCLAIMER

This component is based on the [Path Blueprint](https://lightningdesignsystem.com/components/path/) from the Lightning Design System.
