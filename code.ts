figma.showUI(__html__);

figma.ui.resize(500, 500);

figma.ui.onmessage = async(pluginMessage) => {

  await figma.loadFontAsync({ family: "Rubik", style: "Regular"});

  const postComponentSet = figma.root.findOne(node => node.type == "COMPONENT_SET" && node.name == "post") as ComponentSetNode;

  let selectedVariant;

  console.log(pluginMessage.imageVariant);

  if(pluginMessage.darkModeState === true){
    switch(pluginMessage.imageVariant){
     
      case "2":
        selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=true") as ComponentNode;
        break;
      case "3":
      // create instance of dark mode, carousel
        selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=true") as ComponentNode;
        break;
      default: 
      // create instance of dark mode, no image
        selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=none, Dark mode=true") as ComponentNode;
        break;
    }
  }else{
    switch(pluginMessage.imageVariant){
      case "2":
        selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=false") as ComponentNode;
        // create instance of light mode, single image
        break;
      case "3":
        selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=false") as ComponentNode;
        // create instance of light mode, carousel
        break;
      default: 
        // create instance of light mode, no image
        selectedVariant = postComponentSet.defaultVariant as ComponentNode;
        break;
    }
  }

  const newPost = selectedVariant.createInstance();

  const templateName = newPost.findOne(node => node.type == "TEXT" && node.name == "displayName") as TextNode;
  const templateUsername = newPost.findOne(node => node.name == "@username" && node.type == "TEXT") as TextNode;
  const templateDescription = newPost.findOne(node => node.type == "TEXT" && node.name == "description") as TextNode;

  templateName.characters = pluginMessage.name;
  templateUsername.characters = pluginMessage.username;
  templateDescription.characters = pluginMessage.description;

  console.log(templateName.characters);
  console.log(templateUsername.characters);
  console.log(templateDescription.characters);

  figma.closePlugin();

}

  // defaultVariant.createInstance();

  // console.log(postComponentSet);
  // console.log(postComponentSet.children);
  // console.log(postComponentSet.name);
  // console.log(postComponentSet.type);

  // console.log(pluginMessage.name);
  // console.log(pluginMessage.username);
  // console.log(pluginMessage.description);
  // console.log(pluginMessage.darkModeState);
  // console.log(pluginMessage.imageVariant);


  // * To print a message for dark mode and light mode
  // if(pluginMessage.darkModeState === true){
  //   console.log("Welcome to the dark side!")
  // } else{
  //   console.log("I'm Mr. Light side!")
  // }

  // * To createInstance deoending on darkmode enabled or not
  // if(pluginMessage.darkModeState === true){
  //   defaultDark.createInstance();
  // } else{
  //   defaultVariant.createInstance();
  // }

