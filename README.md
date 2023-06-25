# Color Picker Tool for Web Photo Editor

Welcome to our open-source project, a part of our larger effort towards building a comprehensive photo editing software based on modern web technologies. This specific module focuses on implementing a color picker, a crucial functionality for digital artists and designers.

Added up the followig functionalities: 
- Changing the dropper icon for different cases/usages.
- Changing the background color of the upper selected hex code preview (when user clicks and selects a color on canvas)
- Escape Key and Right Mouse Click functionality.

## Key Technologies

- The project primarily employs HTML's Canvas API for handling and manipulation of image data.
All the codebase is written in TypeScript, ensuring type safety and improved developer experience.
- The project is optimized for handling substantial canvas sizes, capable of managing canvases as large as 16MB (4000 x 4000 pixels).
- It's worth noting that while we have given the highest priority to functionality, the current user interface might seem a bit rudimentary. Any contributions towards improving it are definitely welcome!

## Core Features

Our color picker tool comes with the following primary features:

- Users can activate the tool to select and pick colors directly from the canvas.
- While hovering over the canvas, the tool dynamically displays the HEX color code of the pixel under the cursor.
- The tool's color display updates in real time to reflect the color of the pixel being hovered over.
- After users click on the dropper icon, the cursor will take on the form of a dropper tool. As it hovers over different areas of the canvas, it displays the corresponding color and HEX code. 
- When user wants to choose the color, they can click on canvas to select it. Once a color is selected, the color picker tool updates the HEX code in the header with the chosen color.
- In case if the dropper is active, on Escape Key and Right Mouse Click, dropper becomes inactive.

### NPM Commands

Run the following commands for testing the app. 
- npm run build
    - Run this first to build the app. This command will generate a dist folder.
- npm run develop
    - Run the app on a server "http://localhost:4000/" via this command. Automatically runs the server on browser and leads you there.
- npm run test
    - Note FYI: This command exists, yes. As I did not have time for writing unit tests yet, there are none to run. I can add up the unit tests if we need that.


### Get Involved, please!

- If you find a bug, have suggestions for improvements, or simply want to enhance the existing functionalities, I welcome your issue reports.

Let's work together to create an amazing experience for digital artists and designers!