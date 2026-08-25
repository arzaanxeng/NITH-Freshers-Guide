import { Domain } from '../types'

export const specializedDomains: Domain[] = [
  {
    id: 'game-development',
    name: 'Game Development',
    category: 'specialized',
    shortDescription: 'Game loops, physics, interactive gameplay programming with Unity (C#) and Godot Engine.',
    fullDescription: 'Game development combines real-time interactive software engineering, graphics rendering, audio synthesis, physics simulation, and storytelling. It gives developers deep exposure to vector math, state machines, asset pipelines, and performance optimization under 60fps / 120fps constraints.',
    difficulty: 'Beginner',
    timeline: '3 - 5 weeks to build and publish your first playable 2D arcade game',
    goodFor: ['Game Jams', 'Indie Publishing', 'Interactive Prototyping', 'Physics & Simulation', 'Game Studios'],
    prerequisites: [
      'Basic programming logic (variables, loops, conditional branching)',
      'Basic vector mathematics (2D/3D vectors, direction, speed)',
    ],
    coreTechnologies: [
      { name: 'Unity Engine (C#)', description: 'Industry-standard game engine for 2D, 3D, and mobile titles', docUrl: 'https://docs.unity3d.com/Manual/index.html' },
      { name: 'Godot Engine', description: 'Lightweight, completely free open-source game engine using GDScript / C#', docUrl: 'https://docs.godotengine.org/en/stable/' },
      { name: 'Blender', description: 'Open-source 3D modeling, rigging, and animation suite', docUrl: 'https://docs.blender.org/manual/en/latest/' },
    ],
    dontStartIf: [
      'You try to build a massive multiplayer MMORPG as your first project instead of a simple 2D Pong/Flappy Bird clone.',
    ],
    roadmapSteps: [
      {
        step: 1,
        title: 'Engine Fundamentals & 2D Mechanics',
        duration: '2 - 3 Weeks',
        topics: ['Game loop (Update/FixedUpdate)', 'Rigidbodies & Colliders', 'Input management', 'Sprite animations & tilemaps'],
        keyMilestone: 'Build a playable 2D platformer with score, health, and enemy AI.',
      },
      {
        step: 2,
        title: '3D Gameplay & Polishing',
        duration: '3 - 4 Weeks',
        topics: ['3D Vector math & Quaternions', 'Lighting & Shaders basics', 'Audio management', 'UI menus & save systems'],
        keyMilestone: 'Build a 3D first-person or third-person obstacle puzzle game and publish to Itch.io.',
      },
    ],
    projectIdeas: [
      {
        title: '2D Roguelite Dungeon Crawler',
        level: 'Beginner',
        description: 'Top-down arcade game with procedural room spawning, enemy pathfinding, item pickups, and sound effects.',
        techStack: ['Unity / Godot', 'C# / GDScript', '2D Physics'],
      },
    ],
    primaryCreatorSpotlight: {
      name: 'Brackeys & GMTK (Game Maker\'s Toolkit)',
      reason: 'Brackeys offers the gold-standard Unity tutorials; GMTK teaches game design theory and level mechanics.',
      recommendedStart: 'Brackeys How to make a Video Game Series',
    },
  },
  {
    id: 'computer-graphics',
    name: 'Computer Graphics & Shaders',
    category: 'specialized',
    shortDescription: 'Rendering pipeline, OpenGL / WebGL, GLSL fragment shaders, ray tracing, and math-driven visuals.',
    fullDescription: 'Computer graphics is the computer science discipline behind visual synthesis on displays. Graphics programmers write shaders in GLSL/HLSL, manipulate 3D transformation matrices, simulate light transport through ray tracing, and optimize GPU rendering pipelines.',
    difficulty: 'Advanced',
    timeline: '6 - 10 weeks to build a software rasterizer or basic ray tracer from scratch in C++',
    goodFor: ['Rendering Engineer Roles', 'Visual Effects (VFX)', 'Simulation Software', 'GPU Optimization'],
    prerequisites: [
      'Strong Linear Algebra (matrix multiplication, projection matrices, dot/cross products)',
      'Proficiency in C++ or JavaScript/Three.js',
    ],
    coreTechnologies: [
      { name: 'OpenGL / WebGL', description: 'Cross-language API for rendering 2D and 3D vector graphics', docUrl: 'https://learnopengl.com/' },
      { name: 'GLSL Shaders', description: 'OpenGL Shading Language executing directly on GPU parallel cores', docUrl: 'https://thebookofshaders.com/' },
    ],
    dontStartIf: [
      'You are uncomfortable with 3D coordinate transformations and matrix calculus.',
    ],
    roadmapSteps: [
      {
        step: 1,
        title: 'Math & The Graphics Pipeline',
        duration: '3 - 4 Weeks',
        topics: ['Transformation matrices', 'Vertex & Fragment shaders', 'Lighting models (Phong, Blinn-Phong)', 'Texture mapping'],
        keyMilestone: 'Render a fully textured, lit 3D model with camera controls using LearnOpenGL tutorials.',
      },
    ],
    projectIdeas: [
      {
        title: 'Ray Tracer in One Weekend (C++)',
        level: 'Intermediate',
        description: 'CPU-based ray tracer rendering spheres, reflective materials, shadows, and anti-aliasing to PPM images.',
        techStack: ['C++', 'Linear Algebra', 'Ray Tracing'],
      },
    ],
    primaryCreatorSpotlight: {
      name: 'LearnOpenGL.com (Joey de Vries) & Inigo Quilez',
      reason: 'LearnOpenGL is the universally acclaimed book/tutorial for modern OpenGL; Inigo Quilez is the father of procedural shader math.',
      recommendedStart: 'LearnOpenGL.com getting started tutorials',
    },
  },
  {
    id: 'ar-vr',
    name: 'Augmented & Virtual Reality (XR)',
    category: 'specialized',
    shortDescription: 'Spatial computing, immersive 3D interfaces, WebXR, and Unity XR Interaction Toolkit.',
    fullDescription: 'Extended Reality (XR) bridges virtual environments and physical reality. Developers build immersive applications for headsets (Meta Quest, Apple Vision Pro) and mobile AR (ARKit, ARCore), designing 3D spatial user interfaces and haptic interactions.',
    difficulty: 'Intermediate',
    timeline: '4 - 6 weeks to build your first interactive WebXR or mobile AR app',
    goodFor: ['Spatial Computing', 'Medical & Industrial Training Simulators', 'Architecture & Virtual Tours'],
    prerequisites: [
      'Basic Unity 3D or WebGL/Three.js familiarity',
      'Understanding of 3D spatial coordinates and user interaction',
    ],
    coreTechnologies: [
      { name: 'Unity XR Interaction Toolkit', description: 'Multi-platform framework for VR/AR controller tracking and interactions', docUrl: 'https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@latest' },
      { name: 'WebXR Device API', description: 'Standard browser API for VR and AR experiences without installing native apps', docUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API' },
    ],
    dontStartIf: [
      'You don\'t have a test device or an environment to simulate 6-DoF tracking.',
    ],
    roadmapSteps: [
      {
        step: 1,
        title: 'Spatial UI & 6-DoF Interactions',
        duration: '2 - 3 Weeks',
        topics: ['Controller raycasts & direct grabbing', 'Locomotion & teleportation', 'Mobile AR plane detection (ARCore)'],
        keyMilestone: 'Build an AR room furniture placement app or VR physics sandbox.',
      },
    ],
    projectIdeas: [
      {
        title: 'AR Campus Monument & Building Explorer',
        level: 'Intermediate',
        description: 'Mobile AR application displaying 3D info cards and historical highlights anchored to physical college landmarks.',
        techStack: ['Unity', 'ARCore', 'C#'],
      },
    ],
    primaryCreatorSpotlight: {
      name: 'Valem Tutorials',
      reason: 'The cleanest step-by-step VR and AR development tutorials in Unity with the XR Interaction Toolkit.',
      recommendedStart: 'Unity VR Development for Beginners',
    },
  },
  {
    id: 'cad-3d-design',
    name: 'CAD & 3D Prototyping',
    category: 'specialized',
    shortDescription: 'Parametric 3D modeling with Autodesk Fusion 360, SolidWorks, mechanical drafting, and 3D printing.',
    fullDescription: 'Computer-Aided Design (CAD) and rapid prototyping allow engineers to model precise mechanical parts, robot chassis, drone frames, and enclosures before physical fabrication. Combined with 3D printing (FDM/SLA) and CNC milling, CAD is an indispensable tool for hardware builders and mechanical teams.',
    difficulty: 'Beginner',
    timeline: '2 - 3 weeks to model complex mechanical parts and export print-ready STL files',
    goodFor: ['Robotics Teams (RoboSociety, NIMBUS Teams)', 'Hardware Prototyping', 'Mechanical Product Design'],
    prerequisites: [
      'Spatial visualization ability and basic engineering drawing concepts',
    ],
    coreTechnologies: [
      { name: 'Autodesk Fusion 360', description: 'Cloud-powered parametric 3D CAD, CAM, and generative design tool', docUrl: 'https://help.autodesk.com/view/fusion360/ENU/' },
      { name: 'SolidWorks', description: 'Industry-standard mechanical CAD software for engineering assemblies', docUrl: 'https://www.solidworks.com/support/home' },
      { name: 'UltiMaker Cura / PrusaSlicer', description: '3D printing slicing software converting 3D models to G-code', docUrl: 'https://ultimaker.com/software/ultimaker-cura/' },
    ],
    dontStartIf: [
      'You design parts without considering manufacturing tolerances, overhang angles, and wall thicknesses for 3D printing.',
    ],
    roadmapSteps: [
      {
        step: 1,
        title: 'Parametric 2D Sketches & Constraints',
        duration: '1 - 2 Weeks',
        topics: ['Dimensions & Geometric constraints', 'Extrude, Revolve, Sweep, and Loft', 'Fillets, Chamfers, and Shells'],
        keyMilestone: 'Model a precise snap-fit electronics enclosure with cutouts for USB and display.',
      },
    ],
    projectIdeas: [
      {
        title: 'Custom Drone Frame & Microcontroller Enclosure',
        level: 'Beginner',
        description: 'Complete 3D-printable quadcopter frame with motor mounts, battery bay, and ventilated flight controller case.',
        techStack: ['Fusion 360', 'Cura', '3D Printing'],
      },
    ],
    primaryCreatorSpotlight: {
      name: 'Product Design Online (Kevin Kennedy)',
      reason: 'The absolute best Fusion 360 "Learn in 30 Days" series for engineering students.',
      recommendedStart: 'Learn Fusion 360 in 30 Days on YouTube',
    },
  },
  {
    id: 'research-computational',
    name: 'Academic Research & Scientific Computing',
    category: 'specialized',
    shortDescription: 'Literature review methodology, scientific simulation in Python/SciPy, LaTeX typesetting, and paper publishing.',
    fullDescription: 'Academic research empowers students to explore unsolved engineering questions, run rigorous computational experiments, write peer-reviewed manuscripts, and publish in IEEE, ACM, and Springer conferences. Engaging in research during your early college years is the #1 booster for top global MS/PhD admissions.',
    difficulty: 'Intermediate',
    timeline: '6 - 12 weeks to conduct a literature survey and formulate an original experimental methodology',
    goodFor: ['MS / PhD Admissions (US, Europe, IISc/IITs)', 'R&D Labs (Microsoft Research, Google Research)', 'Patent Filing', 'Conference Publications'],
    prerequisites: [
      'Curiosity for reading academic papers (arXiv, IEEE Xplore, Google Scholar)',
      'Mathematical maturity in probability, linear algebra, and scientific Python (SciPy/NumPy)',
    ],
    coreTechnologies: [
      { name: 'LaTeX & Overleaf', description: 'Standard typesetting language for academic manuscripts, equations, and IEEE templates', docUrl: 'https://www.overleaf.com/learn' },
      { name: 'Google Scholar & ArXiv', description: 'Search engines and pre-print repositories for latest computer science research', docUrl: 'https://scholar.google.com/' },
      { name: 'Zotero', description: 'Open-source reference and citation manager', docUrl: 'https://www.zotero.org/support/' },
      { name: 'SciPy & Matplotlib', description: 'Scientific computing algorithms and publication-quality vector plots', docUrl: 'https://docs.scipy.org/' },
    ],
    dontStartIf: [
      'You are looking for quick weekend hacks — research requires reading dozens of papers, meticulous baselines, and rigorous ablation studies.',
    ],
    roadmapSteps: [
      {
        step: 1,
        title: 'Paper Reading & LaTeX Typesetting',
        duration: '2 - 3 Weeks',
        topics: ['Reading papers systematically (Three-Pass approach)', 'Citation management with Zotero/BibTeX', 'Formatting IEEE two-column papers in Overleaf'],
        keyMilestone: 'Write a comprehensive 4-page literature review paper comparing 10 recent algorithms in your domain.',
      },
    ],
    projectIdeas: [
      {
        title: 'Reproducing & Benchmarking an ArXiv Research Paper',
        level: 'Intermediate',
        description: 'Re-implement a published machine learning or algorithm paper from scratch, verify authors\' claims, and publish results.',
        techStack: ['Python', 'PyTorch / SciPy', 'LaTeX / Overleaf'],
      },
    ],
    primaryCreatorSpotlight: {
      name: 'Yannic Kilcher & Stanford Online',
      reason: 'In-depth paper reviews breaking down novel ML/AI architectures and research methodology.',
      recommendedStart: 'Yannic Kilcher Machine Learning Paper Readings',
    },
  },
]
