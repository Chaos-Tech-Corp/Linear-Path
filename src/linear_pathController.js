({
	doInit : function(cmp, event, helper) {
        cmp.set("v.cmpId", cmp.getGlobalId().replace(/[\W_]+/g,"_"));
        
		var action = cmp.get("c.getPath");
        action.setParams({ recordId : cmp.get("v.recordId"), fieldName : cmp.get("v.fieldName") });
        action.setCallback(this, function(response) {
            var result = response.getReturnValue(),
                index = result.values.length - 1;
            
            cmp.set("v.values", result.values);
            cmp.set("v.isLost", result.isLost);
            cmp.set("v.isClosed", result.isClosed);
            
            if (result.isLost == false) {
                //find the index/position of the picklist value in the list
                for (var i = 0; i < result.values.length; i++) {
                    if (result.values[i] == result.current) {
                        index = i; break;
                    }
                }
            }
            
            cmp.set("v.current", index);
        });
        $A.enqueueAction(action);
	},
     onRender: function(cmp, helper) {
    	
        var autoScale = cmp.get("v.scale"),
            globalId = cmp.get("v.cmpId");

        if (autoScale) {

            let availableWidth = document.getElementById(globalId + "_track_container").clientWidth,
                currentWidth = document.getElementById(globalId + "_nav_container").offsetWidth;
            
            let scale = availableWidth / currentWidth;
            document.getElementById(globalId + "_track_container").style.transform = "scale(" + scale + ")";
            
            window.addEventListener('resize', $A.getCallback(function(){ 
                let availableWidth = document.getElementById(globalId + "_track_container").clientWidth-2,
                    currentWidth = document.getElementById(globalId + "_nav_container").offsetWidth;
                
                let scale = availableWidth / currentWidth;
                document.getElementById(globalId + "_track_container").style.transform = "scale(" + scale + ")";
            }));
        }
    }
})
