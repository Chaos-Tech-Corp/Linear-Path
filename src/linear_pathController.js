({
    doInit : function(cmp, event, helper) {
        cmp.set("v.cmpId", cmp.getGlobalId().replace(/[\W_]+/g,"_"));
        
        let fieldName = cmp.get("v.fieldName");
        if (fieldName == null || fieldName == '') {
            //do nothing...    
            cmp.set("v.errorMessage","Please select a picklist field to use...");
            return;
        }
        
        var action = cmp.get("c.getPath");
        action.setParams({ recordId : cmp.get("v.recordId"), fieldName : fieldName });
        action.setCallback(this, function(response) {
            if (response.getState() == 'ERROR') {
                cmp.set("v.errorMessage","Picklist field not valid, it does not exist or is not a picklist.");
                return;
            } else {
                cmp.set("v.errorMessage",null);
            }
            
            var result = response.getReturnValue();
            
            var cValues = cmp.get("v.closedValues"),
                cLostValues = cmp.get("v.closedLostValues");

            var tmpValues = [],
                index = 0;
            let keyIndex = 0;
            
            if ((cValues != null && cValues.length > 0) || (cLostValues != null && cLostValues.length > 0)) {
                //remove the values from the picklist
                cValues = cValues ? cValues.split(';') : [];
                cLostValues = cLostValues ? cLostValues.split(';') : [];
                for(var key in result.values) {
                    var keep = true;
                    for (var j = 0; j < cValues.length; j++) {
                        if (key.toLowerCase() == cValues[j].trim().toLowerCase() || result.values[key].toLowerCase() == cValues[j].trim().toLowerCase()) {
                            if (result.current == key) {
                                result.isClosed = true;
                                result.isLost = false;
                            } else {
                                keep = false;
                            }
                            break;
                        }
                    }
                    
                    if (keep){
                        for (var j = 0; j < cLostValues.length; j++) {
                            if (key.toLowerCase() == cLostValues[j].trim().toLowerCase() || result.values[key].toLowerCase() == cLostValues[j].trim().toLowerCase()) {
                                if (result.current == key) {
                                    result.isClosed = true;
                                    result.isLost = true;
                                } else {
                                    keep = false;
                                }
                                break;
                            }
                        }
                    }
                    if (keep) {
                        tmpValues.push(result.values[key]);
                        if (key == result.current) {
                            index = keyIndex;
                        }
                        keyIndex++;
                    }
                    
                    
                    
                }
                result.values = tmpValues;
                
                var cValueName = cmp.get("v.closedValueName");
                if (cValueName != null && cValueName.trim() != '' && !result.isClosed) {
                    result.values.push(cValueName);
                }
            }
            else {
                for (var key in result.values) {
                    tmpValues.push(result.values[key]);
                    if (key == result.current || result.current == result.values[key]) {
                        index = keyIndex;
                    }
                    keyIndex++;
                }
            }
            cmp.set("v.isLost", result.isLost);
            cmp.set("v.isClosed", result.isClosed);
            cmp.set("v.values", tmpValues);
            
            /*if (result.isLost == false) {
                //find the index/position of the picklist value in the list
                for (var key in result.values) {
                    if (key == result.current) {
                        index = i; break;
                    }
                }
            }*/
            debugger;
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
