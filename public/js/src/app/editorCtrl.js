agidoMockups.controller("EditorCtrl", ["$scope", "$timeout", "$window", "$compile", function ($scope, $timeout, $window, $compile)
{
    $scope.selectedComponent = null;
    $scope.editingSource = false;

    var clipboard, undoStack = [], redoStack = [];
    var availableFonts = $scope.availableFonts =
            ["Arial", "Bigelow Rules", "Georgia", "Cherry Swash", "Comic Sans MS", "Helvetica", "Lucida Console", "Prosto One", "Stint Ultra Expanded",
                "Times New Roman"];
    var dimensionProperties = [
        {name: "x", hidden: true},
        {name: "y", hidden: true}  ,
        {name: "width", hidden: true},
        {name: "height", hidden: true}
    ];
    var fontProperties = [
        {name: "fontFamily", type: "enum", options: availableFonts},
        {name: "fontSize", type: "number", min: 8},
        {name: "fontStyle", type: "enum", options: ["normal", "bold", "italic"]}
    ];
    var components = {
        "Arrow": {
            constructor: Kinetic.Arrow, options: {
                stroke: '#000', draggable: true, width: 200, height: 50
            },
            hasText: false,
            properties: dimensionProperties.concat([
                {name: "leftDown", type: "boolean"}
            ])
        },
        "Checkbox": {
            constructor: Kinetic.Checkbox, options: {
                color: '#000', draggable: true
            },
            multilineSource: false,
            resizable: false,
            properties: fontProperties.concat(dimensionProperties, [
                {name: "selected", type: "boolean"},
                {name: "disabled", type: "boolean"}
            ])
        },
        "CheckboxGroup": {
            constructor: Kinetic.CheckboxGroup, options: {
                color: '#000', draggable: true
            },
            multilineSource: true,
            resizable: false,
            properties: fontProperties.concat(dimensionProperties)
        },
        "Label": {constructor: Kinetic.Text,
            options: {
                text: "Label",
                fill: '#000',
                draggable: true
            },
            multilineSource: false,
            resizable: false,
            properties: fontProperties.concat(dimensionProperties)
        },
        "Title": {constructor: Kinetic.Text,
            options: {
                fontSize: 48,
                text: "Title",
                fill: '#000',
                draggable: true
            },
            multilineSource: false,
            resizable: false,
            properties: fontProperties.concat(dimensionProperties)
        },
        "Subtitle": {constructor: Kinetic.Text,
            options: {
                fontSize: 32,
                text: "Subtitle",
                fill: '#000',
                draggable: true
            },
            multilineSource: false,
            resizable: false,
            properties: fontProperties.concat(dimensionProperties)
        },
        "Link": {constructor: Kinetic.Link,
            options: {
                color: '#5df',
                draggable: true
            },
            multilineSource: false,
            resizable: false,
            properties: fontProperties.concat(dimensionProperties, [
                {name: "disabled", type: "boolean"}
            ])
        },
        "Panel": {
            constructor: Kinetic.Panel, options: {
                draggable: true
            },
            multilineSource: false,
            properties: dimensionProperties
        },
        "Paragraph": {
            constructor: Kinetic.Paragraph, options: {
                draggable: true
            },
            multilineSource: true,
            resizable: false,
            properties: [
                {name: "fontFamily", type: "enum", options: availableFonts},
                {name: "fontSize", type: "number", min: 8}
            ].concat(dimensionProperties)
        },
        "Pagination": {
            constructor: Kinetic.Pagination, options: {
                draggable: true
            },
            hasText: false,
            resizable: false,
            properties: dimensionProperties
        },
        "RadioItem": {
            constructor: Kinetic.RadioItem, options: {
                color: '#000', draggable: true
            },
            multilineSource: false,
            resizable: false,
            properties: fontProperties.concat(dimensionProperties, [
                {name: "selected", type: "boolean"},
                {name: "disabled", type: "boolean"}
            ])
        },
        "RadioGroup": {
            constructor: Kinetic.RadioGroup, options: {
                color: '#000', draggable: true
            },
            multilineSource: true,
            resizable: false,
            properties: fontProperties.concat(dimensionProperties)
        },
        "Input": {constructor: Kinetic.Input,
            options: {
                color: '#000',
                draggable: true
            },
            multilineSource: false,
            properties: fontProperties.concat(dimensionProperties, [
                {name: "disabled", type: "boolean"}
            ])
        },
        "TextArea": {constructor: Kinetic.TextArea,
            options: {
                color: '#000',
                draggable: true
            },
            multilineSource: true,
            properties: fontProperties.concat(dimensionProperties, [
                {name: "disabled", type: "boolean"}
            ])
        },
        "Button": {constructor: Kinetic.Button,
            options: {
                color: '#000',
                draggable: true
            },
            multilineSource: false,
            properties: fontProperties.concat(dimensionProperties, [
                {name: "disabled", type: "boolean"}
            ])
        },
        "Comment": {constructor: Kinetic.Comment,
            options: {
                color: '#000',
                draggable: true
            },
            multilineSource: true,
            properties: fontProperties.concat(dimensionProperties)
        },
        "Select": {constructor: Kinetic.Select,
            options: {
                color: '#000',
                draggable: true
            },
            multilineSource: true,
            properties: fontProperties.concat(dimensionProperties, [
                {name: "disabled", type: "boolean"},
                {name: "opened", type: "boolean"}
            ])
        },
        "Window": {
            constructor: Kinetic.Window, options: {
                draggable: true
            },
            multilineSource: true,
            properties: dimensionProperties
        },
        "Datepicker": {constructor: Kinetic.Datepicker,
            options: {
                color: '#000',
                draggable: true
            },
            multilineSource: false,
            properties: fontProperties.concat(dimensionProperties, [
                {name: "disabled", type: "boolean"},
                {name: "inline", type: "boolean"}
            ])
        },
        "ImageItem": {constructor: Kinetic.ImageItem,
            options: {
                draggable: true
            },
            multilineSource: false,
            properties: dimensionProperties
        },
        "MenuBar": {constructor: Kinetic.MenuBar,
            options: {
                draggable: true
            },
            multilineSource: false,
            properties: fontProperties.concat(dimensionProperties)
        },
        "Table": {constructor: Kinetic.Table,
            options: {
                draggable: true
            },
            multilineSource: true,
            properties: fontProperties.concat(dimensionProperties, [
                {name: "showHeader", type: "boolean"},
                {name: "padding", type: "number"}
            ])
        },
        "Menu": {constructor: Kinetic.Menu,
            options: {
                draggable: true
            },
            multilineSource: true,
            resizable: false,
            properties: fontProperties.concat(dimensionProperties)
        },
        "RichEditor": {constructor: Kinetic.RichEditor,
            options: {
                color: '#000',
                draggable: true
            },
            multilineSource: true,
            properties: fontProperties.concat(dimensionProperties, [
                {name: "disabled", type: "boolean"}
            ])
        },
        "ColorPicker": {constructor: Kinetic.ColorPicker,
            options: {
                color: 'red',
                draggable: true
            },
            noSource: true,
            properties: dimensionProperties.concat([
                {name: "disabled", type: "boolean"}
            ])
        },
        "ModalOverlay": {constructor: Kinetic.ModalOverlay,
            options: {
                draggable: true
            },
            noSource: true,
            properties: dimensionProperties
        },
        "NumericStepper": {constructor: Kinetic.NumericStepper,
            options: {
                color: '#000',
                draggable: true
            },
            multilineSource: false,
            properties: fontProperties.concat(dimensionProperties, [
                {name: "disabled", type: "boolean"}
            ])
        },
        "FieldSet": {constructor: Kinetic.FieldSet,
            options: {
                draggable: true
            },
            multilineSource: false,
            properties: dimensionProperties
        },
        "HorizontalRule": {constructor: Kinetic.HorizontalRule,
            options: {
                color: '#000',
                draggable: true
            },
            noSource: true,
            properties: dimensionProperties
        },
        "VerticalRule": {constructor: Kinetic.VerticalRule,
            options: {
                color: '#000',
                draggable: true
            },
            noSource: true,
            properties: dimensionProperties
        },
        "VerticalScrollBar": {constructor: Kinetic.VerticalScrollBar,
            options: {
                draggable: true
            },
            noSource: true,
            properties: dimensionProperties
        },
        "HorizontalScrollBar": {constructor: Kinetic.HorizontalScrollBar,
            options: {
                draggable: true
            },
            noSource: true,
            properties: dimensionProperties
        }
    };

    for (var key in components) {
        if (components.hasOwnProperty(key)) {
            components[key].options.componentName = key;
        }
    }

    function markForUndo()
    {
        $scope.exportToJSON();
        undoStack.push($scope.stageSource);
        redoStack.length = 0;
        while (undoStack.length > 30) {
            undoStack.shift();
        }
    }

    function addToStage(component, isAtomic)
    {
        if (isAtomic) {
            markForUndo();
        }
        if (undefined == component.attrs.x) {
            component.setX(($scope.stage.getWidth() - component.getWidth()) / 2);
        }
        if (undefined == component.attrs.y) {
            component.setY(($scope.stage.getHeight() - component.getHeight()) / 2);
        }
        $scope.stage.add(component);
    }

    $scope.addToStage = function (type)
    {
        var scheme = components[type];
        if (null == scheme) {
            throw new Error("Unsupported type: " + type);
        }
        var component = new scheme.constructor(scheme.options);
        component.mockupComponent = scheme;
        addToStage(component, true);
        $timeout(function ()
        {
            $scope.editingSource = true;
        })
    };

    $scope.addToStageFromSearch = function (selection)
    {
        $scope.addToStage(selection.value);
    };

    $scope.search = function (query, callback)
    {
        var results = [];
        var term = query.term.toLowerCase();
        for (var name in components) {
            if (components.hasOwnProperty(name)) {
                if (name.toLowerCase().indexOf(term) > -1) {
                    results.push(name);
                }
            }
        }
        callback(results);
    };

    function applyComponentSource(source)
    {
        if (null != $scope.selectedComponent && null != source && "" != source.trim()) {
            markForUndo();
            $scope.selectedComponent.setText(source);
            $scope.stage.draw();
            return true;
        }
        return false;
    }

    function loadProject(projectId)
    {
        debugger;
        $.ajax({
              type: "GET",
              url: "/api/projects/" + projectId,
              success: function(data){
                debugger;
                // console.log("Loaded");//,data.revision[0].data);
                // initStage( Kinetic.Node.create(data.revision[0].canvasData, 'container'));
               // editController.ImportToStage(data.revision[0].canvasData);
                 $scope.stage.clear();
                 doImportJSON(data.revision[0].canvasData);
                 $("input#projectName").val(data.projectName);
                 $("input#projectName").data("id" , data._id);
                 $("#projectId").val(data._id);
              },
              dataType: "json"
            });
        
    }

    function loadOneMoreProject()
    {
        debugger;
        $.ajax({
        type: "GET",
        url: "/api/projects",
        success: function (projects) {

          $('#projectsList').empty();
          for(var i=0; i<projects.length; i++){
                 debugger;
                
                var $li = $("<li>").attr("data-id", projects[i]._id).appendTo("#projectsList");
                
                $("<a>").attr("ng-click", "loadProject('"+projects[i]._id+"')").text(projects[i].projectName).appendTo($li);
                $compile($li)($scope);

            
            }
    }

        ,
        dataType: "json"
      });
        
    }

    function shareUser()
    {
        debugger;
        $.ajax({
        type: "GET",
        url: "/api/users",
        success: function (users) {

         $('#draggable').empty();
          for(var i=0; i<users.length; i++){
                 // var $li = $("<li><input type = \"checkbox\"  value = '"+users[i].email + "'' > "+ users[i].name +"</li>"
                
                    var $li = $("<li>").attr("data-id", users[i].email).text(users[i].name).appendTo("#draggable");
                    //$("<input type = 'checkbox'>").attr("id",users[i].email).text(users[i].name).appendTo($li);
                    var chk = $('<input>').attr('type', 'checkbox').attr('value', users[i].email).attr('attr', users).appendTo($li);
                    $compile($li)($scope);
               
                }
                    //$('#draggable').append($li);
                    // $compile($li)($scope);
          },
        dataType: "json"
      });
        
    }

    function updateProject()
    {
        // debugger;
        // $('#userForm *').filter(':input').each(function(){
        
        //         if($(this).is(':checked'))
        //         {
        //            console.log($("input:checkbox").is(':checked'));
                 
        //         }

        //     });

        debugger;
        // var selected = new Array();
        //     $(':input:checked').each(function() {
        //     selected.push($(this).attr('id'));
        // });  

       //var selected =  $('#draggable').find('input[type="checkbox"]');
       var selected =  $('#userEmail').val();
       //for(var i=0; i<selected.length; i++)
        //{
            if(selected != "")
            {
                var emails = selected.split(",");
                for(var i=0; i<emails.length;i++) {
                var data = { projectId : $("#projectId").val(), projectName : $("#projectName").val() , user : emails[i]};
                debugger;
                $.ajax({
                      type: "POST",
                      url: "/api/projects/addUser",
                      data: data,
                      success: function(data){
                        console.log("Saved",json);
                        //$window.alert("Shared Successfully");
                        },
                      fail: function(data){
                        //$window.alert("Shared unsuccessful");
                        console.log("Saved",json)},
                      dataType: "json"
                    });
                 var maildata = {
                         to: emails[i],
                         message: 'Artifact '+ $("#projectName").val()+' shared by user: '
                 }
                $.ajax({  
                    type: "POST",  
                    url: "/api/email",  
                    data: maildata,  
                    success: function() { 

                        debugger;
                        //$window.alert("Sharing Successfull") ;
                        console.log('mail sent');
                    },
                    fail: function(){
                        //$window.alert("Sharing unsuccessfull");
                        console.log("Saved",json)}  
                });    
                }
            }
        //}

             
        // var childs =  $( "#draggable" ).children();
        // for(var i=0; i<childs.length; i++)
        // {
          
        //     if(childs[i].children[0].is(':checked'))
        //     {
        //         console.log(childs[i].children[0].is(':checked'));
        //         // var data = childs[i].attr("data-id");

        //         // $.ajax({
        //         //       type: "POST",
        //         //       url: "/api/projects/addUser",
        //         //       data: childs[i].attr("data-id"),
        //         //       success: function(data){console.log("Saved",json)},
        //         //       fail: function(data){console.log("Saved",json)},
        //         //       dataType: "json"
        //         //     });
        //     }
        // }
        
    }



 $scope.updateProject = function ()
    {
        debugger;
        return updateProject();

    };


     $scope.shareUser = function ()
    {
        debugger;
        return shareUser();

    };

    $scope.loadProject = function (projectId)
    {
        debugger;
        return loadProject(projectId);

    };

     $scope.loadOneMoreProject = function (projectId)
    {
        debugger;
        return loadOneMoreProject();

    };

    $scope.saveSource = function (source)
    {

        return applyComponentSource(source);

    };

    $scope.mockupComponentSelected = function (component)
    {
        $scope.selectedComponent = component;
        $scope.selectedComponentProperties = {};
        if (null != component) {
            var properties = component.mockupComponent.properties;
            for (var i = 0; null != properties && i < properties.length; i++) {
                var property = properties[i];
                $scope.selectedComponentProperties.__defineGetter__(property.name, function (propertyName)
                {
                    return null == $scope.selectedComponent ? null : $scope.selectedComponent["get" + Kinetic.Util._capitalize(propertyName)]();
                }.bind(null, property.name));
                $scope.selectedComponentProperties.__defineSetter__(property.name, function (property, value)
                {
                    if (null != $scope.selectedComponent) {
                        if ("number" == property.type && property.min && property.min > value) {
                            return;
                        }
                        markForUndo();
                        $scope.selectedComponent["set" + Kinetic.Util._capitalize(property.name)](value);
                    }
                    $scope.stage.draw();
                }.bind(null, property));
            }
        }
    };

    $scope.mockupComponentGroupSelected = function (component)
    {
        $scope.selectedComponent = null;
        $scope.selectedComponentProperties = {};
        $scope.selectedComponentGroup = component;
        $scope.editingSource = false;
    };

    $scope.stageClicked = function (source)
    {
        if (null != $scope.selectedComponent) {
            if ($scope.selectedComponent.mockupComponent.multilineSource) {
                applyComponentSource(source);
            }
            $scope.selectedComponent = null;
            $scope.editingSource = false;
        }
    };

    $scope.isComponentResizable = function (component)
    {
        return component.mockupComponent.resizable !== false;
    };

    $scope.isMockupComponent = function (component)
    {
        return component.mockupComponent != null;
    };

    $scope.hasSource = function (component)
    {
        return null != component.mockupComponent && !(component.mockupComponent.hasText === false);
    };

    $scope.downloadImage = function ()
    {
        debugger;
//        TODO export only part of stage
        $scope.stage.toDataURL({callback: function (data)
        {
            debugger;
            var pom = document.createElement('a');
//            replace is a hack to force file download in firefox
            pom.setAttribute('href', data.replace(/^data:image\/[^;]/, 'data:application/octet-stream'));
            pom.setAttribute('download', $("#projectName").val()+'.png');
            pom.setAttribute('style', "display:none");
            document.body.appendChild(pom);
            pom.click();
            document.body.removeChild(pom);
        }})
    };

    function doImportJSON(json)
    {
        debugger;
        //clearOnLogout();
        var deserializedObjects = JSON.parse(json);
        //var deserializedObjects = json.canvasData;
        for (var i = 0; i < deserializedObjects.length; i++) {
            var component = Kinetic.Node.create(JSON.stringify(deserializedObjects[i]));
            component.mockupComponent = components[component.attrs.componentName];
            addToStage(component);
        }
    }
    
// var ImportToStage= function (json)
//     {
//         var deserializedObjects = JSON.parse(json);
//         for (var i = 0; i < deserializedObjects.length; i++) {
//             var component = Kinetic.Node.create(JSON.stringify(deserializedObjects[i]));
//             component.mockupComponent = components[component.attrs.componentName];
//             addToStage(component);
//         }
//     }

    $scope.importJSON = function (json)
    {
        markForUndo();
        doImportJSON(json);
    };

    $scope.exportToJSON = function ()
    {
        $scope.stageSource = $scope.stage.toJSON();
    };

    $scope.toggleGrid = function ()
    {
        $scope.stage.toggleGrid();
    };

    $scope.toggleSnapToGrid = function ()
    {
        $scope.stage.toggleSnapToGrid();
    };

    $scope.decreaseGridDensity = function ()
    {
        $scope.stage.decreaseGridDensity();
    };

    $scope.increaseGridDensity = function ()
    {
        $scope.stage.increaseGridDensity();
    };

    $scope.getComponentType = function (component)
    {
        return null == component ? null : component.className;
    };

    $scope.getProperties = function (component)
    {
        return null == component ? null : component.mockupComponent.properties;
    };

    $scope.undo = function ()
    {
        if (undoStack.length > 0) {
            $scope.exportToJSON();
            redoStack.push($scope.stageSource);
            $scope.stage.clear();
            doImportJSON(undoStack.pop());
        }
    };

    $scope.isUndoAvailable = function ()
    {
        return undoStack.length > 0;
    };

    $scope.redo = function ()
    {
        if (redoStack.length > 0) {
            $scope.exportToJSON();
            undoStack.push($scope.stageSource);
            $scope.stage.clear();
            doImportJSON(redoStack.pop());
        }
    };

    $scope.isRedoAvailable = function ()
    {
        return redoStack.length > 0;
    };

    $scope.duplicate = function ()
    {
        if (null != $scope.selectedComponent) {
            //noinspection JSValidateTypes
            var clone = new $scope.selectedComponent.mockupComponent.constructor($scope.selectedComponent.attrs);
            var parent = $scope.selectedComponent.getParent();
            if (parent instanceof Kinetic.Layer) {
                clone.setX(clone.getX() + 15);
                clone.setY(clone.getY() + 15);
            } else {
                var original = undefined == parent ? $scope.selectedComponent : parent;
                clone.setX(original.getX() + 15);
                clone.setY(original.getY() + 15);
            }
            clone.mockupComponent = $scope.selectedComponent.mockupComponent;
            $scope.selectedComponent = clone;
            addToStage(clone, true);
        }
    };

    $scope.cut = function ()
    {
        if (null != $scope.selectedComponent) {
            markForUndo();
            clipboard = $scope.selectedComponent;
            clipboard.remove();
            $scope.selectedComponent = null;
            $scope.editingSource = false;
            $scope.stage.draw();
        }
    };

    $scope.isClipboardEmpty = function ()
    {
        return null == clipboard;
    };

    $scope.paste = function ()
    {
        if (null != clipboard) {
            $scope.selectedComponent = clipboard;
            $scope.duplicate();
        }
    };

    $scope.delete = function ()
    {
        if (null != $scope.selectedComponent) {
            markForUndo();
            if ($scope.selectedComponent.getParent() instanceof Kinetic.Layer) {
                $scope.selectedComponent.destroy();
            } else {
                $scope.selectedComponent.getParent().destroy();
            }
            $scope.selectedComponent = null;
            $scope.editingSource = false;
            $scope.stage.draw();
        } else if (null != $scope.selectedComponentGroup) {
            /**
             * markForUndo will remove all children from selection group so we need to copy references to them
             */
            var children = $scope.selectedComponentGroup.getChildren().toArray();
            markForUndo();
            Kinetic.Collection.toCollection(children).each(function (child)
            {
                child.destroy();
            });
            $scope.selectedComponentGroup.destroy();
            $scope.selectedComponentGroup = null;
            $scope.editingSource = false;
            $scope.stage.draw();
        }
    };

    $scope.clearStage = function ()
    {
        if ($window.confirm("Are you sure you want to clear stage?")) {
            markForUndo();
            $scope.stage.clear();
            $('#projectName').val("");
            $('#projectId').val("");
        }
    };

    $scope.clearOnLogout = function ()
    {
        $.ajax({  
            type: "GET",  
            url: "/logout",   
            success: function() {
                $('#logoutMenu').hide();
                $('#loginMenu').show();
                $('#projectName').val("");
                $('#projectId').val("");
                $('#projectsList').empty();
                $scope.stage.clear();
                $('#showArtifacts').hide();
                $('#shareButton').hide();
                $('#email').val("");
                $('#password').val("");
        }  
      });
    };  

    $scope.lock = function ()
    {
//        TODO implement this method
        alert("Not implemented yet");
    };

    $scope.$on("AgidoMockups.sourceReady", function (event, json)
    {
        $scope.importJSON(json);
    });

    $scope.save = function ()
    {
         debugger;
        $scope.exportToJSON();
        $scope.$emit("AgidoMockups.save", $scope.stageSource);
        $scope.stage.toDataURL({callback: function (data)
        {
            debugger;

            $scope.$emit("AgidoMockups.save", $scope.stageSource);
                    debugger;
                  $('.error').hide();  
                  var projectName = $("input#projectName").val();  
                  var projectId = $("#projectId").val(); 
                  if (projectName == "") {  
                    $("label#projectName_error").show();  
                    $("input#projectName").focus();  
                    return false;  
                  }  
                  else{
                    // save stage as a json string
                    debugger;
                    var json = $scope.stageSource;

                    $.ajax({
                      type: "POST",
                      url: "/api/projects",
                      data: {projectName: projectName, projectId: projectId, data:json},
                      success: function(data){
                        console.log("Saved",data)
                        $("#projectId").val(data.projectId);
                        $window.alert("Saved Successfully"); 
                        },
                      fail: function(data){
                        console.log("Saved",json)
                        $("label#projectName_error").show();
                        $("input#projectName").focus();
                        $window.alert("Saved unsuccessful "+ data);
                        },
                      dataType: "json"
                    });
                  }
              
        }})
    };

    $scope.moveToTop = function ()
    {
        if (null != $scope.selectedComponent) {
            markForUndo();
            $scope.selectedComponent.getParent().moveToTop();
            $scope.stage.draw();
        }
    };

    $scope.moveUp = function ()
    {
        if (null != $scope.selectedComponent) {
            markForUndo();
            $scope.selectedComponent.getParent().moveUp();
            $scope.stage.draw();
        }
    };

    $scope.moveDown = function ()
    {
        if (null != $scope.selectedComponent) {
            markForUndo();
            $scope.selectedComponent.getParent().moveDown();
            $scope.stage.draw();
        }
    };

    $scope.moveToBottom = function ()
    {
        if (null != $scope.selectedComponent) {
            markForUndo();
            $scope.selectedComponent.getParent().moveToBottom();
            $scope.stage.draw();
        }
    };

}]);


