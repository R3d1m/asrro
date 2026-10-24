export interface ProjectSpec {
  label: string;
  value: string;
  detail?: string;
}

export interface ProjectSubteam {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  responsibilities: string[];
  techStack: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  type: "image" | "video";
  src: string;
  aspect: "wide" | "tall" | "square" | "panoramic";
  category: string;
  caption: string;
}

export interface TeamMember {
  name: string;
  deptOrBatch?: string;
  role?: string;
}

export interface ProjectLeadership {
  role: string;
  name: string;
}

export interface SubteamLeadGroup {
  area: string;
  lead: string;
  coLeads?: string[];
  members?: string[];
}

export interface FacultyAdvisor {
  name: string;
  title: string;
}

export interface ProjectData {
  slug: string;
  index: string;
  code: string;
  title: string;
  fullTitle: string;
  category: string;
  status: string;
  subdomain: string;
  heroImage: string;
  heroVideo?: string;
  summary: string;
  overview: string[];
  objectives: string[];
  specs: ProjectSpec[];
  architecture?: Array<{ title: string; items: string[] }>;
  subteams: ProjectSubteam[];
  gallery: GalleryItem[];
  team: {
    leadership: ProjectLeadership[];
    subteamLeads?: SubteamLeadGroup[];
    advisors?: FacultyAdvisor[];
    formerLeads?: Array<{ name: string; deptOrBatch?: string }>;
    members?: TeamMember[];
    sponsorship?: string;
  };
}

export const projectsData: Record<string, ProjectData> = {
  "starlap": {
    slug: "starlap",
    index: "01",
    code: "AERO-RK-01",
    title: "STARLAP Genesis-I",
    fullTitle: "Shahid Tanvin Aerospace & Rocket Launching Project",
    category: "Aerospace, Rocketry & Solid Propulsion",
    status: "FLAGSHIP ROCKETRY PROGRAM",
    subdomain: "starlap.asrrocuetbd.org",
    heroImage: "/images/projects/starlap.png",
    heroVideo: "/andromeda.mp4",
    summary: "STARLAP is ASRRO's flagship rocketry program, focused on designing, developing, and launching sounding rockets. Through deep research in solid propulsion, aerodynamics, avionics, and telemetry, STARLAP advances student-led aerospace innovation at CUET.",
    overview: [
      "STARLAP (Shahid Tanvin Aerospace and Rocket Launching Project) is the flagship rocketry program of the Andromeda Space & Robotics Research Organization (ASRRO) at Chittagong University of Engineering & Technology (CUET).",
      "As CUET's first student-led rocket research and development initiative, STARLAP provides rigorous hands-on experience in rocket design, composite propellant formulation, computational avionics, high-precision manufacturing, telemetry acquisition, and suborbital launch operations.",
      "The program's premier sounding rocket, Genesis-I, features an indigenous composite solid propellant motor, aerodynamic supersonic fin architecture, dual-altimeter telemetry payload, and autonomous dual-parachute recovery mechanism."
    ],
    objectives: [
      "Design, fabricate, and launch student-engineered sounding rockets capable of reaching high suborbital apogees.",
      "Formulate, cast, and static-fire test safe, high-impulse composite solid and hybrid rocket propellant grains.",
      "Integrate multi-channel telemetry, GNSS tracking, and onboard environmental sensor payloads for real-time flight telemetry downlink.",
      "Establish institutional safety protocols and computational design standards for aerospace rocketry in Bangladesh."
    ],
    specs: [
      { label: "TARGET APOGEE", value: "3.5 km", detail: "Level-1 Suborbital Altitude" },
      { label: "MOTOR THRUST", value: "1,200 N", detail: "Custom Composite Solid Propellant" },
      { label: "DOWNLINK LINK", value: "433 MHz LoRa", detail: "Real-time Telemetry & GPS" },
      { label: "RECOVERY SYSTEM", value: "Dual Parachute", detail: "Drogue at Apogee + Main at 300m" },
      { label: "MAX ACCELERATION", value: "8.4 G", detail: "Peak Transonic Velocity" },
      { label: "AIRFRAME DIAMETER", value: "102 mm", detail: "Supersonic Aerodynamic Shroud" }
    ],
    architecture: [
      {
        title: "AeroPropulsion Stack",
        items: ["Custom composite solid propellant grain", "Graphite converging-diverging nozzle", "Ignition pyrotechnic charge", "Thermal barrier insulation sleeve"]
      },
      {
        title: "Avionics Flight Computer",
        items: ["STM32 Cortex-M7 central microcontroller", "Dual barometric altimeters", "9-DOF IMU sensor fusion", "High-power 433 MHz LoRa transceiver"]
      },
      {
        title: "Recovery & Airframe",
        items: ["Precision-milled supersonic fiberglass airframe", "CO2/Pyrotechnic ejection bay", "High-altitude drogue parachute", "Ripstop nylon main landing canopy"]
      }
    ],
    subteams: [
      {
        id: "aeropropulsion",
        code: "SUB-PROP-01",
        name: "AeroPropulsion Division",
        description: "Responsible for rocket propellant formulation, combustion chamber mechanics, nozzle expansion geometry, and static test-stand instrumentation.",
        image: "/images/projects/subteams/propulsion.jpg",
        responsibilities: [
          "Solid composite propellant casting & burn-rate characterization",
          "Thrust profile measurement via calibrated load-cell test bench",
          "Nozzle contour optimization using isentropic expansion models",
          "Thermal insulation casing and safety pressure release discs"
        ],
        techStack: ["Composite Solid Propellant", "Burn Rate Analysis", "Load Cell DAQ", "Thermal Engineering"]
      },
      {
        id: "design-simulation",
        code: "SUB-AERO-02",
        name: "Design & Aerodynamic Simulation",
        description: "Engineers the supersonic aerodynamic profile, performs computational fluid dynamics (CFD), and structural stress verification under supersonic dynamic pressures.",
        image: "/images/projects/subteams/aerodynamics.jpg",
        responsibilities: [
          "3D parametric CAD modeling and fin flutter mitigation",
          "Computational Fluid Dynamics (CFD) transonic pressure mapping",
          "Center of Pressure (CP) vs Center of Gravity (CG) stability margin",
          "Composite airframe structural fabrication and payload bay integration"
        ],
        techStack: ["Ansys Fluent", "OpenRocket", "SolidWorks CAD", "Von Mises FEA"]
      },
      {
        id: "avionics-telemetry",
        code: "SUB-AVIO-03",
        name: "Avionics & Telemetry Systems",
        description: "Designs redundant flight computers, sensor fusion telemetry, long-range RF downlinks, and pyrotechnic recovery deployment sequencers.",
        image: "/images/projects/subteams/avionics.jpg",
        responsibilities: [
          "Multi-layer PCB routing with noise-isolated power rails",
          "Real-time sensor polling (BMP388, BNO055, GPS NEO-M9N)",
          "Long-range encrypted LoRa telemetry packet broadcasting",
          "Dual-event parachute firing logic with apogee detection algorithms"
        ],
        techStack: ["STM32 Embedded C", "Altium Designer", "433 MHz LoRa", "Extended Kalman Filter"]
      }
    ],
    gallery: [
      {
        id: "starlap-gal-1",
        title: "Supersonic Ascent Trajectory",
        type: "image",
        src: "/images/projects/gallery/starlap-launch.jpg",
        aspect: "wide",
        category: "FLIGHT TEST",
        caption: "Sounding rocket launch milestone reaching targeted suborbital flight altitude."
      },
      {
        id: "starlap-gal-2",
        title: "Cosmic Deep Space Orbit Simulator",
        type: "video",
        src: "/andromeda.mp4",
        aspect: "wide",
        category: "ORBITAL SIMULATION",
        caption: "Infinite 60fps telemetry visualizer simulating deep-space orbital insertion."
      },
      {
        id: "starlap-gal-3",
        title: "Avionics Cleanroom Calibration",
        type: "image",
        src: "/images/projects/gallery/starlap-lab.jpg",
        aspect: "tall",
        category: "LABORATORY R&D",
        caption: "Telemetry avionics sensor calibration and flight computer bench validation."
      },
      {
        id: "starlap-gal-4",
        title: "Official STARLAP Genesis Mission Crest",
        type: "image",
        src: "/images/projects/starlap.png",
        aspect: "panoramic",
        category: "MISSION LOGO",
        caption: "Shahid Tanvin Aerospace and Rocket Launching Project banner over Earth horizon."
      }
    ],
    team: {
      leadership: [
        { role: "Project Manager", name: "Sajib Kumar Kar" },
        { role: "Deputy Manager", name: "Shuvo Ahmed" }
      ],
      subteamLeads: [
        {
          area: "AeroPropulsion",
          lead: "Shuvo Ahmed",
          members: ["Anower Hossen Saki", "Ahnaf Shahriar Arnob"]
        },
        {
          area: "Design & Simulation",
          lead: "Anish Deb Turjo",
          coLeads: ["Jaminur Rahman Khalid"],
          members: ["Anupom Das Kabyo", "Asfat Kabir Sifat", "Ridoy Chandra Sarkar", "Md Rezwanul Abedin Toufiq", "Azaharul Islam"]
        },
        {
          area: "Avionics & Telemetry",
          lead: "Meshba Khan",
          coLeads: ["Faisal Taysir", "Shan"],
          members: ["Kabya Prakash Chakraborty", "Faria Anowara Adhora", "Mohammad Mesbahul Alam", "Aadil Mubasshar", "Shourv Tarafder", "Aditi Das", "Amlan Sarkar"]
        }
      ],
      advisors: [
        { name: "Dr. Sajal Chandra Banik", title: "Professor, Dept. of Mechanical Engineering, CUET" },
        { name: "Dr. Muhammad Ahsan Ullah", title: "Professor, Dept. of Electrical & Electronic Engineering, CUET" },
        { name: "Dr. Mahbubul Alam", title: "Professor, Dept. of Mechanical Engineering, CUET" },
        { name: "Dr. Yunus Ahmed", title: "Professor, Department of Chemistry, CUET" }
      ]
    }
  },

  "cuas-uav": {
    slug: "cuas-uav",
    index: "02",
    code: "AERO-CUAS-02",
    title: "ASRRO C-UAS UAV Team",
    fullTitle: "Counter-Unmanned Aircraft Systems Autonomous Interceptor Team",
    category: "Counter-UAS & Autonomous Aerial Systems",
    status: "ACTIVE R&D / COMPETITION",
    subdomain: "cuas.asrrocuetbd.org",
    heroImage: "/images/projects/cuas-drone.jpg",
    summary: "The ASRRO C-UAS UAV Competition Project is an elite student-led initiative developing an autonomous unmanned aerial system engineered for counter-UAS operations, real-time computer vision target tracking, and dynamic aerial interception.",
    overview: [
      "The rapid proliferation of unmanned aerial vehicles has created an urgent imperative for autonomous systems capable of detecting, tracking, classifying, and intercepting unauthorized aerial intrusions.",
      "For the prestigious C-UAS UAV Competition, ASRRO is engineering a custom multi-rotor platform combining carbon-composite airframe dynamics, onboard AI perception, sensor fusion, and high-bandwidth telemetry.",
      "The system is structured as a modular architecture where airframe, computer vision, autopilot firmware, and tactical ground-control subsystems can be validated independently before full-system field trials."
    ],
    objectives: [
      "Develop a high-maneuverability, competition-ready autonomous UAV platform.",
      "Implement fully autonomous waypoint navigation, dynamic trajectory planning, and fail-safe return-to-home protocols.",
      "Achieve real-time target detection and continuous visual tracking using onboard edge neural networks.",
      "Fuse multi-spectral camera feeds, GNSS, and IMU data for robust localization even in GPS-degraded zones.",
      "Establish a low-latency encrypted command and video link with the tactical Ground Control System (GCS)."
    ],
    specs: [
      { label: "MISSION ROLE", value: "C-UAS Intercept", detail: "Autonomous Intrusion Neutralization" },
      { label: "AI PERCEPTION", value: "Real-time YOLO/TensorRT", detail: "Target Detection & Optical Flow" },
      { label: "FLIGHT CONTROL", value: "PX4 / ArduPilot", detail: "Autonomous Waypoints & Dynamic Hold" },
      { label: "TELEMETRY LINK", value: "Encrypted GCS Stream", detail: "Long-Range Tactical Downlink" },
      { label: "PROPULSION", value: "High-KV Brushless", detail: "Rapid Acceleration & High Thrust" },
      { label: "FRAME MATERIAL", value: "Carbon Fiber Composite", detail: "Ultra-rigid & Low Aerodynamic Drag" }
    ],
    architecture: [
      {
        title: "Airframe & Propulsion Subsystem",
        items: ["Custom carbon fiber frame", "High-efficiency brushless motors", "Optically-isolated ESCs", "High-C rating LiPo power bus"]
      },
      {
        title: "Autopilot & Navigation",
        items: ["32-bit flight controller", "Triple redundant IMU", "Centimeter-accurate GNSS module", "Optical flow altitude LiDAR"]
      },
      {
        title: "Perception & Edge Computing",
        items: ["Global shutter tracking camera", "Embedded AI accelerator processor", "Deep neural network inference engine", "Dynamic target prioritization"]
      }
    ],
    subteams: [
      {
        id: "airframe-mechanical",
        code: "SUB-FRAME-01",
        name: "Airframe & Mechanical Systems",
        description: "Designs the lightweight carbon fiber chassis, vibration-dampened motor mounts, and high-agility aerodynamic configuration for agile target tracking.",
        image: "/images/projects/subteams/airframe.jpg",
        responsibilities: [
          "Custom carbon-fiber CNC chassis routing and structural FEA",
          "Propulsion arm vibration dampening and motor thrust isolation",
          "Aerodynamic drag reduction for high-speed pitch maneuvers",
          "Field modularity for rapid propeller and arm replacements"
        ],
        techStack: ["Carbon Fiber CNC", "SolidWorks FEA", "Dynamic Balancing", "Mechanical Design"]
      },
      {
        id: "vision-ai",
        code: "SUB-AI-02",
        name: "Computer Vision & AI Perception",
        description: "Develops deep learning perception pipelines for rapid airborne target acquisition, bounding-box tracking, and optical target trajectory prediction.",
        image: "/images/projects/subteams/computervision.jpg",
        responsibilities: [
          "Dataset curation and aerial UAV detection model training",
          "TensorRT edge model optimization for low-latency inference",
          "Real-time visual servoing and target tracking lock algorithms",
          "Optical flow sensor integration for velocity estimation"
        ],
        techStack: ["YOLOv8", "TensorRT", "OpenCV", "PyTorch Edge"]
      },
      {
        id: "flight-control",
        code: "SUB-CTRL-03",
        name: "Flight Controller & Firmware",
        description: "Configures autopilot control loops, autonomous waypoint navigation, dynamic intercept trajectories, and safety failsafes.",
        image: "/images/projects/subteams/flightcontrol.jpg",
        responsibilities: [
          "PID loop tuning for aggressive attitude response",
          "Autonomous mission-planner waypoint and loiter sequences",
          "Extended Kalman Filter (EKF) sensor fusion tuning",
          "Automated geofence containment and emergency parachute failsafes"
        ],
        techStack: ["PX4 Autopilot", "ArduPilot", "MAVLink", "EKF State Estimation"]
      }
    ],
    gallery: [
      {
        id: "cuas-gal-1",
        title: "Autonomous Aerial Intercept",
        type: "image",
        src: "/images/projects/gallery/cuas-flight.jpg",
        aspect: "wide",
        category: "FLIGHT TESTING",
        caption: "ASRRO C-UAS drone executing autonomous target acquisition maneuvers during field trials."
      },
      {
        id: "cuas-gal-2",
        title: "ASRRO Drone Team Official Insignia",
        type: "image",
        src: "/images/projects/cuas-drone.jpg",
        aspect: "square",
        category: "TEAM EMBLEM",
        caption: "Official emblem and tactical aeronautics insignia of the ASRRO Drone Team and C-UAS Interceptor Wing."
      },
      {
        id: "cuas-gal-3",
        title: "Laboratory Vision Bench Testing",
        type: "image",
        src: "/images/projects/subteams/computervision.jpg",
        aspect: "tall",
        category: "COMPUTER VISION",
        caption: "Real-time edge AI object tracking evaluation on synthetic target drone flight feeds."
      }
    ],
    team: {
      leadership: [
        { role: "Advisor & Mentor", name: "Mrinmoy Modak (Former President, ASRRO)" }
      ],
      members: [
        { name: "Faria Anowara Adhora", deptOrBatch: "EEE'21" },
        { name: "Shourv Tarafder", deptOrBatch: "EEE'21" },
        { name: "Md. Ayaat", deptOrBatch: "EEE'22" },
        { name: "Ammar Mahmud", deptOrBatch: "ME'22" },
        { name: "Redwan", deptOrBatch: "CSE'22" },
        { name: "Abidur Rahman Adil", deptOrBatch: "ME'22" },
        { name: "S.K. Sami", deptOrBatch: "EEE'23" },
        { name: "Anas Bin Alam Alvi", deptOrBatch: "EEE'23" },
        { name: "Md. Mubin", deptOrBatch: "EEE'23" },
        { name: "Zayeem", deptOrBatch: "Mechatronics'23" },
        { name: "Meraz", deptOrBatch: "Mechatronics'23" },
        { name: "Nasir Uddin Ammar", deptOrBatch: "BME'23" }
      ]
    }
  },

  "canal-drone": {
    slug: "canal-drone",
    index: "03",
    code: "AERO-SURV-03",
    title: "Canal Progress Monitoring Drone",
    fullTitle: "Autonomous UAV & Edge AI Linear Infrastructure Monitoring System",
    category: "UAV & Edge AI Geospatial Engineering",
    status: "PROTOTYPE / TESTING",
    subdomain: "canal.asrrocuetbd.org",
    heroImage: "/images/projects/canal-drone.jpg",
    summary: "An applied UAV and Edge AI research initiative developing a low-cost autonomous drone platform capable of surveying linear canal construction, generating 3D terrain models, and calculating excavation progress without human field intervention.",
    overview: [
      "Canal irrigation and linear earthwork infrastructure require continuous monitoring for schedule adherence, quality assurance, and progress-based billing. Conventional monitoring relies on manual tape surveys and physical markers, which are slow, labor-intensive, and error-prone.",
      "The Canal Progress Monitoring Drone Project solves this challenge by developing a fully autonomous survey system that reconstructs the as-built terrain geometry, compares it with CAD design models, and generates quantitative progress analytics automatically.",
      "The system combines drone-mounted georeferenced photogrammetry, dual-frequency GNSS Precise Point Positioning (PPP), and onboard edge neural networks using NVIDIA Jetson Orin Nano (67 TOPS) to eliminate paid RTK fees and physical Ground Control Points (GCPs)."
    ],
    objectives: [
      "Capture centimeter-accurate georeferenced aerial imagery along canal corridors autonomously.",
      "Perform onboard Edge AI photogrammetric reconstruction using Structure-from-Motion (SfM).",
      "Deploy deep learning semantic segmentation (DeepLabV3+/U-Net) to classify dug, undug, waterlogged, and vegetation zones.",
      "Calculate earthwork excavation volumes and cross-sectional deviations against initial engineering designs.",
      "Eliminate expensive paid RTK services and physical Ground Control Points via dual-frequency PPP GNSS."
    ],
    specs: [
      { label: "EDGE AI ENGINE", value: "Jetson Orin (67 TOPS)", detail: "1024-core Ampere GPU + 8GB LPDDR5" },
      { label: "3D MODELING", value: "SfM Photogrammetry", detail: "Dense Point Clouds & Digital Surface Models" },
      { label: "POSITIONING", value: "Dual-Freq GNSS (PPP)", detail: "Quectel LC29H Centimeter Accuracy" },
      { label: "SURVEY ACCURACY", value: "Zero GCPs / No RTK Fee", detail: "Precise Point Positioning Calibration" },
      { label: "CAMERA PAYLOAD", value: "Global Shutter RGB", detail: "Gimbal Stabilized Aerial Mapping" },
      { label: "TELEMETRY LINK", value: "4G/LTE + Wi-Fi", detail: "Automated Cloud Report Upload" }
    ],
    subteams: [
      {
        id: "drone-flight",
        code: "SUB-UAV-01",
        name: "UAV Systems & Flight Operations",
        description: "Develops the survey airframe, autonomous linear corridor waypoint flight paths, and stabilized global-shutter camera gimbal payload.",
        image: "/images/projects/subteams/airframe.jpg",
        responsibilities: [
          "Linear corridor mission planning with automated overlap calculation",
          "3-axis brushless camera gimbal stabilization and vibration isolation",
          "Laser altimeter integration for precise terrain-following altitude",
          "Extended flight endurance testing under variable crosswind conditions"
        ],
        techStack: ["Pixhawk Autopilot", "Mission Planner", "Brushless Gimbal", "LiPo Power Systems"]
      },
      {
        id: "photogrammetry-cv",
        code: "SUB-GEO-02",
        name: "Photogrammetry & 3D Reconstruction",
        description: "Executes Structure-from-Motion (SfM) pipelines, dense point cloud generation, and digital surface model (DSM) extraction.",
        image: "/images/projects/subteams/photogrammetry.jpg",
        responsibilities: [
          "Structure-from-Motion feature matching across sequential aerial frames",
          "High-resolution orthomosaic stitching and DSM generation",
          "3D mesh texturing and digital elevation contour extraction",
          "Integration with OpenDroneMap and COLMAP photogrammetry engines"
        ],
        techStack: ["OpenDroneMap", "COLMAP", "Point Cloud Library (PCL)", "QGIS"]
      },
      {
        id: "edge-ai-analytics",
        code: "SUB-AI-03",
        name: "Edge AI & Analytics Engine",
        description: "Implements semantic segmentation neural networks on Jetson Orin Nano for terrain material segmentation and volumetric earthwork comparison.",
        image: "/images/projects/subteams/edgeai.jpg",
        responsibilities: [
          "Semantic segmentation for excavated vs unexcavated channel zones",
          "TensorRT INT8/FP16 acceleration on NVIDIA Jetson Orin Nano",
          "As-built vs design CAD profile differential comparison algorithms",
          "Automated PDF executive progress summary generation and cellular transmission"
        ],
        techStack: ["NVIDIA Jetson Orin", "TensorRT", "DeepLabV3+", "Python GeoPandas"]
      }
    ],
    gallery: [
      {
        id: "canal-gal-1",
        title: "Autonomous Corridor Aerial Survey",
        type: "image",
        src: "/images/projects/gallery/canal-survey.jpg",
        aspect: "wide",
        category: "FIELD SURVEY",
        caption: "Mapping drone surveying linear canal earthworks for 3D terrain reconstruction."
      },
      {
        id: "canal-gal-2",
        title: "Survey Drone Hardware Platform",
        type: "image",
        src: "/images/projects/canal-drone.jpg",
        aspect: "square",
        category: "HARDWARE",
        caption: "Custom survey drone with high-stability gimbal payload and Quectel GNSS receiver."
      },
      {
        id: "canal-gal-3",
        title: "3D Photogrammetry Point Cloud",
        type: "image",
        src: "/images/projects/subteams/photogrammetry.jpg",
        aspect: "tall",
        category: "3D TERRAIN",
        caption: "Digital Surface Model reconstructed from multi-angle overlapping georeferenced imagery."
      }
    ],
    team: {
      leadership: [
        { role: "Project Manager", name: "Faria Anowara Adhora" },
        { role: "Hardware & Manufacturing Lead", name: "Kabyo Prakash Chakrabarty" },
        { role: "Software, AI & Autonomous Systems Lead", name: "MD. Abtahee Kabir" },
        { role: "Electronics & Control Systems Lead", name: "Shourv Tarafder" }
      ],
      members: [
        { name: "Ratul", deptOrBatch: "EEE'22" },
        { name: "Rihan", deptOrBatch: "EEE'22" },
        { name: "Prottoy", deptOrBatch: "ME'22" },
        { name: "Simi", deptOrBatch: "ME'22" },
        { name: "Muhidul Islam", deptOrBatch: "Mechatronics'23" },
        { name: "Tahmid Farabi", deptOrBatch: "EEE'23" },
        { name: "Tahmid", deptOrBatch: "BME'23" },
        { name: "Shafin Shahadat", deptOrBatch: "EEE'23" }
      ]
    }
  },

  "asrroscope": {
    slug: "asrroscope",
    index: "04",
    code: "OPTI-DS-04",
    title: "ASRROSCOPE Deep-Sky",
    fullTitle: "ASRROSCOPE 160mm Dobsonian Astronomical Observation Project",
    category: "Astronomy & Optical Engineering",
    status: "OPERATIONAL AT CUET",
    subdomain: "observatory.asrrocuetbd.org",
    heroImage: "/images/projects/asrroscope.jpg",
    summary: "ASRROSCOPE is ASRRO's student-led astronomical observation and telescope development project, centered on designing, manufacturing, operating, and improving a Dobsonian telescope for deep-sky observation and astrophysical research.",
    overview: [
      "ASRROSCOPE is the premier astronomical observation initiative of ASRRO at Chittagong University of Engineering & Technology (CUET).",
      "The project provides practical hands-on experience in optical mirror grinding, precision mechanical mounting, astronomical observations, and scientific data acquisition.",
      "The telescope is designed around a 160 mm diameter primary mirror with a 1280 mm focal length (f/8), delivering up to 320x optical magnification. It brings into high-contrast focus deep-sky celestial wonders including the Andromeda Galaxy (M31), Whirlpool Galaxy (M51), Orion Nebula (M42), and Pleiades (M45)."
    ],
    objectives: [
      "Design, fabricate, and maintain a student-built optical astronomical telescope.",
      "Facilitate regular deep-sky astrophotography and planetary observations for university researchers.",
      "Document and map celestial targets: Andromeda Galaxy, Orion Nebula, Whirlpool Galaxy, and planetary ring systems.",
      "Develop technical expertise in optical collimation, secondary mirror alignment, and telescope mechanics.",
      "Promote space science and observational astronomy outreach across Bangladesh."
    ],
    specs: [
      { label: "PRIMARY APERTURE", value: "160 mm Mirror", detail: "Ground Parabolic Optical Glass" },
      { label: "FOCAL LENGTH", value: "1280 mm (f/8)", detail: "High-Contrast Deep-Sky Ratio" },
      { label: "MAGNIFICATION", value: "Up to 320× Optical", detail: "Interchangeable 25mm & 7.5mm Eyepieces" },
      { label: "KEY TARGET", value: "M31 Andromeda & Deep Sky", detail: "Messier Catalog Galaxies & Nebulae" },
      { label: "MOUNT DESIGN", value: "Dobsonian Alt-Azimuth", detail: "Smooth Low-Friction Bearings" },
      { label: "TUBE ASSEMBLY", value: "Reinforced Composite", detail: "Light-Baffled Interior Barrel" }
    ],
    subteams: [
      {
        id: "optical-engineering",
        code: "SUB-OPT-01",
        name: "Optical Engineering & Mirror Fabrication",
        description: "Focuses on primary mirror curvature inspection, reflective aluminizing coating, optical collimation, and diffraction testing.",
        image: "/images/projects/subteams/optics.jpg",
        responsibilities: [
          "Primary mirror curvature verification and Ronchi optical testing",
          "Secondary diagonal mirror alignment and spider hub stabilization",
          "Laser collimation procedures for razor-sharp optical focus",
          "Antireflective coating maintenance and dust prevention protocol"
        ],
        techStack: ["Optical Collimation", "Ronchi Grid Testing", "Focal Ratio Optimization", "Optical Cleaning"]
      },
      {
        id: "mount-mechanics",
        code: "SUB-MNT-02",
        name: "Mechanical & Mounting Systems",
        description: "Designs the heavy-duty rocker box, altitude bearings, azimuth pivot plate, and transportable structural chassis.",
        image: "/images/projects/subteams/mount.jpg",
        responsibilities: [
          "Dobsonian altitude-azimuth rocker box structural fabrication",
          "Virgin Teflon and textured laminate friction bearing tuning",
          "Counterweight dynamic balance for heavy camera payload attachments",
          "Modular disassembly design for field stargazing expeditions"
        ],
        techStack: ["Precision Machining", "Teflon Bearings", "Structural Balance", "CAD Mechanical Assembly"]
      },
      {
        id: "astrophotography",
        code: "SUB-ASTRO-03",
        name: "Astrophotography & Scientific Observation",
        description: "Operates planetary and deep-sky imaging sensors, optical frame stacking, and observational astronomical logging.",
        image: "/images/projects/subteams/astrophotography.jpg",
        responsibilities: [
          "Deep-sky exposure sequencing and focal plane camera adapters",
          "Dark, flat, and bias frame calibration for sensor noise reduction",
          "Messier catalog astrometry coordinate logging and ephemeris tracking",
          "Public stargazing workshop facilitation and astrophotography exhibition"
        ],
        techStack: ["DeepSkyStacker", "Siril Astro Processing", "CMOS Planetary Sensors", "SkySafari Ephemeris"]
      }
    ],
    gallery: [
      {
        id: "scope-gal-1",
        title: "Andromeda Galaxy (M31) Astrometric Capture",
        type: "image",
        src: "/images/projects/asrroscope.jpg",
        aspect: "wide",
        category: "DEEP SKY",
        caption: "Luminous spiral arms and core of Andromeda Galaxy observed through ASRRO optical systems."
      },
      {
        id: "scope-gal-2",
        title: "Deep Space Stellar Nursery",
        type: "image",
        src: "/images/projects/gallery/space-deep.jpg",
        aspect: "square",
        category: "ASTROPHOTOGRAPHY",
        caption: "Long-exposure capture of celestial nebulae and stellar clusters from CUET observation camp."
      },
      {
        id: "scope-gal-3",
        title: "Cosmic Motion Video Study",
        type: "video",
        src: "/andromeda.mp4",
        aspect: "wide",
        category: "OBSERVATORY VIDEO",
        caption: "High-definition infinite stellar motion footage studied by ASRRO astrophysics division."
      }
    ],
    team: {
      leadership: [
        { role: "Project Manager", name: "Amlan Sarker (EEE'21)" },
        { role: "Mechanical & Mounting Systems Lead", name: "Asfat Kabir Sifat (ME'21)" }
      ],
      formerLeads: [
        { name: "G. M. Faysal Taysir", deptOrBatch: "CSE'20" },
        { name: "Rayhanul Nayeem", deptOrBatch: "ME'20" }
      ],
      subteamLeads: [
        {
          area: "Research, Operation & Logistics",
          lead: "Partha Sarathi Goswami (EEE'21)",
          members: ["Sanjay Das (EEE'21)", "Jannatul Maowa (ME'21)"]
        },
        {
          area: "Design & Mechanical Systems",
          lead: "Anupom Das Kabya (ME'21)",
          members: ["Rejwanul Abedin Toufiq (ME'21)"]
        }
      ],
      advisors: [
        { name: "Fahim Foysal Shuvo", title: "Former ASRRO Advisor & Alumnus (ME'17)" }
      ],
      sponsorship: "Supported by ASRRO Research Fund and Distinguished CUET Alumni"
    }
  },

  "cuet-bus": {
    slug: "cuet-bus",
    index: "05",
    code: "IOT-TRK-05",
    title: "My CUET Bus App",
    fullTitle: "My CUET Bus: Smart Campus Transportation & IoT Telemetry System",
    category: "Smart Campus IoT & Fleet Telemetry",
    status: "PROTOTYPE DEPLOYED",
    subdomain: "mycuetbus.web.app",
    heroImage: "/images/projects/cuet-bus.jpg",
    summary: "My CUET Bus App is a smart campus transit platform designed to eliminate scheduling uncertainty. Combining custom ESP32 IoT hardware, SIM800L cellular telemetry, Mapbox geospatial mapping, and a cloud backend, it delivers real-time bus tracking to university students.",
    overview: [
      "University bus transportation systems often force students to depend on rigid static timetables or blind guesses regarding transit arrivals and traffic bottlenecks.",
      "My CUET Bus App transforms university commuting into a centralized digital service. It integrates custom-fabricated vehicle-mounted hardware with an intuitive mobile application and cloud services.",
      "Equipped with an ESP32 microcontroller, SIM800L cellular transmitter, and NEO-6M GPS receiver, each bus continuously streams its coordinates to Firebase and renders smoothly on custom Mapbox digital maps."
    ],
    objectives: [
      "Deploy custom low-cost IoT vehicle-tracking hardware on all university commuter buses.",
      "Broadcast real-time vehicle coordinates, heading, and speed via cellular GPRS telemetry.",
      "Provide an intuitive mobile application for students displaying live buses moving on digital maps.",
      "Publish dynamic route schedules, timing alterations, and university administrative transit notices.",
      "Establish a scalable architecture extendable to school, regional, and industrial fleet logistics."
    ],
    specs: [
      { label: "HARDWARE CORE", value: "ESP32 + NEO-6M GPS", detail: "Custom Power-Regulated MCU Board" },
      { label: "CELLULAR LINK", value: "SIM800L Module", detail: "Real-time GPRS Telemetry Packets" },
      { label: "MAPPING ENGINE", value: "Mapbox Geospatial API", detail: "Vector Maps & Route Interpolation" },
      { label: "CLOUD BACKEND", value: "Firebase Realtime DB", detail: "Sub-Second State Synchronization" },
      { label: "MOBILE FRONTEND", value: "React Native Cross-Platform", detail: "iOS and Android Native Experience" },
      { label: "POWER INPUT", value: "12V-to-5V Automotive Buck", detail: "Vehicle Bus Battery + Backup LiPo" }
    ],
    subteams: [
      {
        id: "iot-embedded",
        code: "SUB-IOT-01",
        name: "IoT Hardware & Embedded Systems",
        description: "Designs the onboard tracker device, automotive power regulator, GPS antenna integration, and SIM800L cellular packet firmware.",
        image: "/images/projects/subteams/iot-hardware.jpg",
        responsibilities: [
          "ESP32 micro-controller firmware programming in C++",
          "NMEA GPS sentence parsing and coordinate jitter smoothing",
          "SIM800L HTTP/TCP telemetry packet queueing with reconnect handlers",
          "Automotive 12V transient voltage suppression and battery backup circuit"
        ],
        techStack: ["ESP32", "SIM800L", "NEO-6M GPS", "Embedded C++", "Altium PCB"]
      },
      {
        id: "mobile-app",
        code: "SUB-APP-02",
        name: "Mobile App Development & UI/UX",
        description: "Constructs the student mobile application using React Native, providing intuitive route selection, bus schedules, and notification alerts.",
        image: "/images/projects/subteams/mobile-dev.jpg",
        responsibilities: [
          "Cross-platform responsive client development in React Native",
          "Live vehicle selection interface with smooth animated transition",
          "Offline schedule caching and push notification services for delays",
          "User profile management and student feedback portal"
        ],
        techStack: ["React Native", "TypeScript", "Tailwind CSS", "Expo"]
      },
      {
        id: "geospatial-cloud",
        code: "SUB-GEO-03",
        name: "Geospatial Mapping & Cloud Services",
        description: "Integrates Mapbox vector mapping, real-time vehicle movement interpolation, and Firebase backend security rules.",
        image: "/images/projects/subteams/photogrammetry.jpg",
        responsibilities: [
          "Mapbox SDK integration with custom CUET campus vector map tiles",
          "Vehicle marker smooth bearing and velocity interpolation",
          "Firebase Realtime Database indexing and schema security",
          "Geofencing logic for automated bus stop arrival detection"
        ],
        techStack: ["Mapbox GL", "Firebase", "Google Cloud", "GeoJSON Routing"]
      }
    ],
    gallery: [
      {
        id: "bus-gal-1",
        title: "Campus Transit In Motion",
        type: "image",
        src: "/images/projects/gallery/cuet-transit.jpg",
        aspect: "wide",
        category: "TRANSIT FLEET",
        caption: "University transport buses monitored in real-time across regional campus routes."
      },
      {
        id: "bus-gal-2",
        title: "Fleet Vehicle Telemetry Unit",
        type: "image",
        src: "/images/projects/cuet-bus.jpg",
        aspect: "square",
        category: "FLEET HARDWARE",
        caption: "Night deployment testing of smart transit tracking with GPS and telemetry hardware."
      },
      {
        id: "bus-gal-3",
        title: "IoT Hardware Prototyping",
        type: "image",
        src: "/images/projects/subteams/iot-hardware.jpg",
        aspect: "tall",
        category: "EMBEDDED IOT",
        caption: "Bench validation of ESP32 and SIM800L module transmitting live GPS telemetry packets."
      }
    ],
    team: {
      leadership: [
        { role: "Project Manager", name: "Ahnaf Shahriar Arnob" },
        { role: "Hardware & Manufacturing Lead", name: "Kabya Prakash Chakraborty" },
        { role: "Software & Autonomous Systems Lead", name: "Md. Manon Haque" }
      ],
      members: [
        { name: "ASRRO Smart Systems & IoT Laboratory Group", deptOrBatch: "CUET Campus Division" }
      ],
      sponsorship: "Live Deployed Web Application at mycuetbus.web.app"
    }
  }
};

export const allProjectsList = Object.values(projectsData);
