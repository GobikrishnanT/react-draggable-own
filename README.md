# 🦖 Dragzilla

**Dragzilla** is your new best friend in the world of drag-and-drop! Inspired by the mighty [`react-draggable`](https://github.com/react-grid-layout/react-draggable), this package is here to stomp over the limitations of the old ways with its powerful claws! 🐾

Built with **React** ⚛️ and **TypeScript** 💻, Dragzilla is designed to give you a roaring good time by solving those pesky issues that have been bugging you. Say goodbye to viewport troubles and fragile code, and hello to a smoother, more stable drag-and-drop experience!

## 🦾 Key Features

- **📏 Viewport-Friendly Positioning**: Unlike `react-draggable`, which sneaks in the `transform` property, Dragzilla uses `position: absolute` with `top` and `left` for element alignment. This means your draggable elements won't mess with `position: fixed` items—they'll play nicely in the same viewport! 🏖️

- **🔒 Stable and Standard Codebase**: React can be a bit moody sometimes. That’s why Dragzilla avoids React's fragile code by using standard rendering practices. Instead of relying on `React.createElement` (boring, right?), Dragzilla asks you to pass components via props. It’s like letting you choose the toppings on your pizza! 🍕

- **🌐 Browser Support**: Right now, Dragzilla is a browser-only beast, but don’t worry—I am working on touch events support for all you mobile warriors out there. Stay tuned! 📱

## 🧐 Why Dragzilla?

Why did we unleash Dragzilla into the wild? Simple—because `react-draggable` just wasn’t cutting it! Here’s what drove us:

1. **👀 Viewport Issues**: The `transform` property in `react-draggable` creates a new stacking context, which can be as annoying as trying to find a needle in a haystack! Dragzilla fixes this by using `position: absolute`, ensuring your draggable elements behave as they should. No funny business.

2. **💥 Code Stability**: Ever feel like your code might just break if you look at it the wrong way? `react-draggable` uses some... let’s call them *interesting* techniques, like `React.createElement`. Dragzilla says “No thanks!” and uses a more standard approach, making your code sturdier and easier to work with. 💪

## 🚀 Installation

🛑 **Hold your horses!** Dragzilla is not on npm just yet, but it’s coming soon! Keep your eyes peeled for the release.

## 🕹️ Usage

Once Dragzilla is available, here’s how you can use it to level up your project:

```tsx
import React from 'react';
import Dragzilla from 'dragzilla';

const WithHandler = (props : IChildrenPropType) => {
    const {className , id ,style} = props;
    let finalStyle = (() => {
        const customStyle = {
            // any of custom style
        };
        if(style && Object.keys(style ?? {}).length) {
            return {
                ...customStyle,
                ...style
            }
        }
        return customStyle;
    })();
    
    return (
        <div id={id} className={`${className} draggable-elem display-flex`} style={finalStyle}>
            <div className='handle cursor-pointer draggable-handle display-flex justify-content-center align-items-center'>Handle</div>
            <div className='flex-grow-1 display-flex justify-content-center align-items-center'>Dragzilla</div>
        </div>
    )
}

const MyComponent = () => {
  return (
    <Dragzilla Children={WithHandle} />
  )
};

export default MyComponent;
```

## 🔮 Future Plans

- **👆 Touch Event Handling**: We’re working on touch events so Dragzilla can play nice with mobile and tablet devices too. 📲
- **📦 npm Release**: The package will soon be stomping onto npm for easy installation and updates.

## 🎉 Contributing

Got some cool ideas or found a bug? Dragzilla wants YOU! Feel free to open an issue or submit a pull request. Together, we can make Dragzilla even more awesome! 🚀

## 📜 License

Dragzilla is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
