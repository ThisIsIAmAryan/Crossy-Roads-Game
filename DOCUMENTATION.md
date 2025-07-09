# Crossy Roads Game - Technical Documentation

## 📖 Table of Contents
- [Overview](#overview)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Core Components](#core-components)
- [Game Mechanics](#game-mechanics)
- [Setup & Installation](#setup--installation)
- [Build & Development](#build--development)
- [Code Organization](#code-organization)
- [API Reference](#api-reference)
- [Contributing](#contributing)

## 🎮 Overview

This is a modern web-based implementation of the classic Crossy Roads game built with **Three.js** and **Vite**. The game features a 3D isometric view where players navigate a character across dynamically generated roads while avoiding moving vehicles and obstacles.

### Key Features
- **3D Graphics**: Built with Three.js for immersive 3D gameplay
- **Infinite Gameplay**: Procedurally generated roads and obstacles
- **Multiple Vehicle Types**: Cars and trucks with different speeds and behaviors
- **Collision Detection**: Real-time hit testing using bounding boxes
- **Responsive Controls**: Keyboard and touch support
- **Score System**: Distance-based scoring with game over mechanics

## 📁 Project Structure

```
Crossy-Roads-Game/
├── index.html                    # Main HTML entry point
├── package.json                  # Dependencies and scripts
├── README.md                     # Project overview
├── public/                       # Static assets
│   ├── crossy-road.svg          # Game favicon
│   └── vite.svg                 # Vite logo
└── src/                         # Source code
    ├── main.js                  # Application entry point
    ├── style.css                # Global styles
    ├── constants.js             # Game constants
    ├── collectUserInput.js      # Input handling
    ├── animatePlayer.js         # Player movement animation
    ├── animateVehicles.js       # Vehicle movement animation
    ├── hitTest.js               # Collision detection
    ├── components/              # 3D components
    │   ├── Camera.js            # Orthographic camera setup
    │   ├── Car.js               # Car 3D model
    │   ├── DirectionalLight.js  # Lighting configuration
    │   ├── Grass.js             # Grass terrain
    │   ├── Map.js               # Game world management
    │   ├── Player.js            # Player character
    │   ├── Renderer.js          # WebGL renderer
    │   ├── Road.js              # Road terrain
    │   ├── Tree.js              # Tree obstacles
    │   ├── Truck.js             # Truck 3D model
    │   └── Wheel.js             # Vehicle wheel component
    └── utilities/               # Helper functions
        ├── calculateFinalPosition.js  # Position calculations
        ├── endsUpInValidPosition.js   # Move validation
        └── generateRows.js            # Procedural generation
```

## 🛠 Technology Stack

- **Three.js** (v0.175.0) - 3D graphics and WebGL rendering
- **Vite** (v6.2.0) - Build tool and development server
- **Vanilla JavaScript** (ES6+) - Core game logic
- **CSS3** - Styling and UI
- **HTML5** - Canvas and DOM structure

## 🏗 Architecture

The game follows a modular architecture with clear separation of concerns:

### Core Systems
1. **Rendering System**: Three.js scene, camera, and lighting
2. **Input System**: Keyboard and touch input handling
3. **Animation System**: Player and vehicle movement
4. **Collision System**: Hit detection and game over logic
5. **World Generation**: Procedural road and obstacle creation

### Data Flow
```
User Input → Movement Queue → Animation → Position Update → Collision Check → Score Update
```

## 🧩 Core Components

### Scene Setup (`main.js`)
The main entry point initializes the Three.js scene with:
- **Scene**: Container for all 3D objects
- **Camera**: Orthographic camera for isometric view
- **Lighting**: Ambient and directional lighting
- **Renderer**: WebGL renderer with shadow mapping

### Player System (`Player.js`)
- **3D Model**: White body with pink cap
- **Movement Queue**: Queued movement system for smooth animation
- **Position Tracking**: Row and tile-based coordinate system
- **Validation**: Move validation before execution

### Map System (`Map.js`)
- **Procedural Generation**: Dynamic row creation
- **Terrain Types**: Grass fields and roads
- **Obstacle Placement**: Trees and vehicles
- **Infinite World**: Continuous row generation

### Vehicle System (`Car.js`, `Truck.js`)
- **3D Models**: Detailed car and truck meshes
- **Movement**: Horizontal scrolling with wrapping
- **Collision**: Bounding box collision detection
- **Randomization**: Random colors, speeds, and positions

## 🎯 Game Mechanics

### Movement System
- **Grid-based**: Player moves on a tile-based grid
- **Animation**: Smooth interpolation between positions
- **Direction**: Forward, backward, left, right movement
- **Validation**: Prevents invalid moves (boundaries, obstacles)

### Collision Detection
```javascript
// Bounding box intersection
const playerBoundingBox = new THREE.Box3();
playerBoundingBox.setFromObject(player);

const vehicleBoundingBox = new THREE.Box3();
vehicleBoundingBox.setFromObject(vehicle);

if (playerBoundingBox.intersectsBox(vehicleBoundingBox)) {
    // Game Over
}
```

### Procedural Generation
- **Row Types**: Forest (with trees), Car lanes, Truck lanes
- **Random Placement**: Vehicles and trees positioned randomly
- **Infinite Generation**: New rows added as player advances

### Scoring System
- **Distance-based**: Score equals the furthest row reached
- **Real-time Updates**: Score displayed during gameplay
- **Game Over**: Final score shown on collision

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation Steps
```bash
# Clone the repository
git clone <repository-url>
cd Crossy-Roads-Game

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Build & Development

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally

### Development Features
- **Hot Module Replacement**: Instant updates during development
- **ES6 Modules**: Modern JavaScript module system
- **Source Maps**: Easy debugging in development
- **Tree Shaking**: Optimized production bundles

## 📝 Code Organization

### Constants (`constants.js`)
```javascript
export const minTileIndex = -12;    // Left boundary
export const maxTileIndex = 12;     // Right boundary
export const tilesPerRow = 25;      // Total tiles per row
export const tileSize = 42;         // Size of each tile
```

### Component Pattern
Each 3D component follows a consistent factory pattern:
```javascript
export function ComponentName(parameters) {
    const group = new THREE.Group();
    
    // Create geometry and materials
    const mesh = new THREE.Mesh(geometry, material);
    
    // Configure properties
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    
    // Add to group
    group.add(mesh);
    
    return group;
}
```

### Animation Loop
```javascript
function animate() {
    animateVehicles();  // Move cars and trucks
    animatePlayer();    // Handle player movement
    hitTest();          // Check collisions
    
    renderer.render(scene, camera);  // Render frame
}
```

## 📚 API Reference

### Player Functions
- `queueMove(direction)` - Queue a movement direction
- `stepCompleted()` - Complete a movement step
- `initializePlayer()` - Reset player to starting position

### Map Functions
- `initializeMap()` - Create initial map
- `addRows()` - Generate new rows ahead of player

### Utilities
- `calculateFinalPosition(position, moves)` - Calculate end position
- `endsUpInValidPosition(position, moves)` - Validate move sequence
- `generateRows(amount)` - Create procedural content

### Input Handling
```javascript
// Keyboard controls
ArrowUp    → queueMove("forward")
ArrowDown  → queueMove("backward")
ArrowLeft  → queueMove("left")
ArrowRight → queueMove("right")

// Touch controls (UI buttons)
▲ → forward
▼ → backward
◀ → left
▶ → right
```

## 🎨 Styling & UI

### CSS Features
- **Retro Font**: "Press Start 2P" for authentic game feel
- **Responsive Design**: Adapts to different screen sizes
- **Game Controls**: Touch-friendly button layout
- **Score Display**: Fixed position scoring
- **Game Over Modal**: Centered result screen

### UI Elements
- **Canvas**: Full-screen game rendering
- **Score Counter**: Top-left position indicator
- **Control Buttons**: Bottom-center navigation
- **Game Over Screen**: Modal with retry option

## 🐛 Common Issues & Solutions

### Performance Optimization
- Vehicles are recycled at row boundaries
- Limited number of simultaneous objects
- Efficient bounding box calculations

### Browser Compatibility
- Modern browsers with WebGL support required
- ES6 module support needed
- Touch events for mobile devices

## 🤝 Contributing

### Development Guidelines
1. Follow existing code patterns and structure
2. Maintain consistent component naming conventions
3. Add comments for complex algorithms
4. Test changes across different devices
5. Update documentation for new features

### Code Style
- Use ES6+ features consistently
- Prefer const/let over var
- Use descriptive variable names
- Keep functions focused and small
- Maintain consistent indentation

## 🔍 Performance Considerations

### Optimization Strategies
- **Object Pooling**: Reuse vehicle objects instead of creating new ones
- **Culling**: Only render visible objects
- **Efficient Collision**: Use bounding boxes for fast intersection tests
- **Minimal DOM Updates**: Cache DOM elements and update sparingly

### Memory Management
- Remove unused rows from memory
- Dispose of Three.js geometries and materials properly
- Limit maximum number of active objects

## 🎮 Game Balance

### Difficulty Progression
- **Vehicle Density**: More vehicles at higher scores
- **Speed Variation**: Random vehicle speeds create unpredictability
- **Pattern Mixing**: Alternating terrain types prevent predictable patterns

### Player Experience
- **Smooth Movement**: 0.2-second step animations
- **Clear Feedback**: Visual rotation and jumping animations
- **Fair Collision**: Accurate bounding box detection

---

*This documentation covers the technical implementation of the Crossy Roads game. For gameplay instructions, see the main README.md file.*
