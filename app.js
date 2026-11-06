/**
 * StampChain - Complete Enterprise Multi-Page Logistics Platform
 * Interactive Pixel-Art Logistics World + Multi-Page Role-Based Control Center
 */

// Application & Router State
const StampChainState = {
  currentUser: {
    name: 'Chief Dispatcher',
    email: 'admin@stampchain.io',
    role: 'admin', // 'admin', 'driver', 'warehouse', 'receiver'
    roleLabel: 'Admin / Dispatcher'
  },
  currentPage: 'dashboard', // 'dashboard', 'shipments', 'shipment_details', 'live_tracking', 'checkpoints', 'alerts', 'analytics', 'audit', 'settings', 'role_cockpit'
  activeShipmentId: 'SC-1048',
  activeTab: 'timeline',
  isPlaying: true,
  playbackSpeed: 1,
  currentTimeProgress: 0.52,
  selectedEntity: 'truck',
  activeTimelineEventId: 'tl_live_surat',
  spotlightNodeId: null,
  showGeofences: true,
  searchFilter: '',
  checkpointFilter: 'all',
  mapTransform: {
    x: 0,
    y: 0,
    scale: 1,
    isDragging: false,
    startX: 0,
    startY: 0,
    initialPinchDist: 0,
    initialScale: 1
  }
};

// GEOFENCES
const GEOFENCE_AREAS = [
  { id: 'geo_ahmedabad', name: 'Ahmedabad Fulfillment Perimeter', x: 160, y: 110, radius: 45, type: 'warehouse', entryTime: '07:45 AM', verifyTime: '08:00 AM' },
  { id: 'geo_vadodara', name: 'Vadodara Checkpoint Corridor', x: 390, y: 250, radius: 40, type: 'checkpoint', entryTime: '10:58 AM', verifyTime: '11:26 AM' },
  { id: 'geo_surat', name: 'Surat North Congestion Geofence', x: 580, y: 420, radius: 48, type: 'hazard', entryTime: '14:06 PM', verifyTime: '14:48 PM' },
  { id: 'geo_vapi', name: 'Vapi Inter-State Border Zone', x: 720, y: 580, radius: 38, type: 'checkpoint', entryTime: 'Pending', verifyTime: 'Pending' },
  { id: 'geo_mumbai', name: 'Mumbai Bhiwandi Terminal Yard', x: 880, y: 760, radius: 52, type: 'destination', entryTime: 'Pending', verifyTime: 'Pending' }
];

// ROUTE WAYPOINTS & CORRIDORS
const CORRIDOR_DATA = {
  corridorName: 'NH 48 Western Freight Spine',
  totalDistanceKm: 525,
  waypoints: [
    { id: 'wp_ahmedabad', name: 'Ahmedabad Fulfillment Hub', type: 'warehouse', km: 0, x: 160, y: 110, state: 'verified', passedTime: '08:00 AM', units: 500, supervisor: 'P. Sharma' },
    { id: 'wp_nadiad', name: 'Nadiad Toll Gateway', type: 'checkpoint', km: 55, x: 270, y: 180, state: 'verified', passedTime: '09:45 AM', method: 'FASTag RFID', inspector: 'NHAI Gantry 04' },
    { id: 'wp_vadodara', name: 'Vadodara Checkpoint', type: 'checkpoint', km: 110, x: 390, y: 250, state: 'verified', passedTime: '11:26 AM', method: 'QR Verification', inspector: 'Insp. S. Rathore' },
    { id: 'wp_bharuch', name: 'Bharuch Weighbridge', type: 'checkpoint', km: 190, x: 500, y: 330, state: 'verified', passedTime: '01:15 PM', method: 'Weigh-In-Motion 38.4T', inspector: 'Gujarat RTO' },
    { id: 'wp_surat_hazard', name: 'Surat North Hazard Zone', type: 'hazard', km: 260, x: 580, y: 420, state: 'delayed', passedTime: '14:48 PM', method: 'Incident Log #TRF-902', inspector: 'Surat Police' },
    { id: 'wp_navsari', name: 'Navsari Transit Depot', type: 'checkpoint', km: 320, x: 650, y: 500, state: 'upcoming', passedTime: '04:30 PM (Est.)', method: 'Scheduled E-Way', inspector: 'South Gujarat Post' },
    { id: 'wp_vapi', name: 'Vapi State Border Post', type: 'checkpoint', km: 390, x: 720, y: 580, state: 'upcoming', passedTime: '05:40 PM (Est.)', method: 'Inter-State Seal Scan', inspector: 'Maharashtra Border Post' },
    { id: 'wp_manor', name: 'Manor Checkpoint', type: 'checkpoint', km: 450, x: 790, y: 670, state: 'upcoming', passedTime: '06:50 PM (Est.)', method: 'Toll Gantry', inspector: 'NHAI Manor' },
    { id: 'wp_mumbai', name: 'Mumbai Bhiwandi Gateway', type: 'destination', km: 525, x: 880, y: 760, state: 'upcoming', passedTime: '07:40 PM (Est.)', units: 498, supervisor: 'S. Mehta (Consignee)' }
  ],
  deviationWaypoints: [
    { x: 580, y: 420 },
    { x: 620, y: 460 },
    { x: 670, y: 440 },
    { x: 710, y: 490 },
    { x: 720, y: 580 }
  ]
};

// MULTI-SHIPMENT REPOSITORY
const SHIPMENTS_DATABASE = {
  'SC-1048': {
    id: 'SC-1048',
    vehiclePlate: 'GJ01XX1234',
    vehicleType: 'Articulated 18-Wheeler Multi-Axle Hauler',
    corridorName: 'NH 48 Western Freight Spine',
    origin: 'Ahmedabad Fulfillment Hub',
    destination: 'Mumbai Bhiwandi Gateway',
    currentLocation: 'Near Surat (NH 48 Km 285)',
    speedKmh: 46,
    heading: 'South-South-East (168°)',
    gpsUpdatedAgo: '2 min ago',
    eta: '7:40 PM',
    etaDelayImpact: '+1h 20m',
    status: 'blue',
    isDeviated: false,
    dwellStatus: 'long_dwell',
    dwellDuration: '42 min',
    routeFraction: 0.52,

    driver: {
      name: 'Rajesh Kumar',
      id: 'DRV-IN-9941',
      experience: '12 Years Heavy Freight',
      license: 'GJ01-2012009841',
      status: 'Delayed',
      assignedVehicle: 'GJ01XX1234',
      currentLocation: 'Near Surat (NH 48 Km 285)',
      dutyHours: '5h 22m / Max 9h (Compliant)',
      lastVerifiedEvent: 'Vadodara Checkpoint QR Scan (11:26 AM)',
      biometricConfidence: '99.8% Match'
    },

    quantity: {
      ordered: 500,
      loaded: 500,
      transferred: 500,
      received: 498,
      difference: -2,
      variancePercent: '-0.40%',
      hasMismatch: true,
      mismatchReason: '2 cartons damaged during severe bridge vibration near Bharuch; quarantined in receiving dock bay.'
    },

    timelineEvents: [
      {
        id: 'tl_loaded',
        title: 'Loaded',
        location: 'Ahmedabad Fulfillment Hub',
        verificationState: 'VERIFIED',
        time: '08:00 AM',
        targetMapId: 'wp_ahmedabad',
        isProof: true,
        proofType: 'Warehouse E-Seal & Weight Confirmation',
        proofDetails: '450 cold pallets loaded. E-Seal #SC-EL-9921 locked.',
        hash: '0x8f2d619a9b441f92e847c1042a9bc4e0821'
      },
      {
        id: 'tl_gate_out',
        title: 'Gate Out',
        location: 'Ahmedabad Security Gate',
        verificationState: 'VERIFIED',
        time: '08:30 AM',
        targetMapId: 'wp_ahmedabad',
        isProof: true,
        proofType: 'RFID FASTag & Security Weight Scan',
        proofDetails: 'Gross Weight: 38,420 kg verified. Departure stamp issued.',
        hash: '0x9910ba48201a0bc114fe8271049281a00318'
      },
      {
        id: 'tl_entered_vadodara',
        title: 'Entered Geofence',
        location: 'Vadodara Perimeter',
        verificationState: 'GEOFENCE ENTERED',
        time: '10:58 AM',
        targetMapId: 'wp_vadodara',
        isProof: true,
        proofType: 'Corridor RF Geofence Automatic Handshake',
        proofDetails: 'Vehicle crossed into 40km Vadodara checkpoint perimeter ring.',
        hash: 'GEO-ENTRY: GEOFENCE-02-VADODARA'
      },
      {
        id: 'tl_checkpoint_vadodara',
        title: 'Checkpoint Verified',
        location: 'Vadodara Checkpoint',
        verificationState: 'VERIFIED',
        time: '11:26 AM',
        targetMapId: 'wp_vadodara',
        isProof: true,
        proofType: 'Physical QR Verification & Officer Biometrics',
        proofDetails: 'Inspected & verified by Dispatcher (Insp. S. Rathore ID: GUJ-POL-8821).',
        hash: '0x4a9128fef660a920b7713da47021eec4189'
      },
      {
        id: 'tl_live_surat',
        title: 'Current Location',
        location: 'Near Surat (Km 285)',
        verificationState: 'LIVE GPS',
        time: '15:52 PM (2m ago)',
        targetMapId: 'truck',
        isProof: false,
        proofType: 'Live GPS Satellite Telemetry (Unverified Algorithmic Stream)',
        proofDetails: 'Speed: 46 km/h. Moving South along NH48. Live GPS coordinates updated 2 min ago.',
        hash: 'GPS-STREAM: 21.1702N, 72.8311E [UNVERIFIED TELEMETRY]'
      },
      {
        id: 'tl_delay_surat',
        title: 'Long Dwell Delay',
        location: 'Surat North Hazard Zone',
        verificationState: 'TRAFFIC DELAY',
        time: '14:48 PM',
        targetMapId: 'wp_surat_hazard',
        isProof: true,
        proofType: 'Traffic Incident Log #TRF-902 & 42m Standstill Hold',
        proofDetails: '42 minute complete stop due to arterial monsoon congestion. ETA impact: +1h 20m.',
        hash: '0x17fa2b98841029e018449c0018f92147ac0'
      },
      {
        id: 'tl_arrival_mumbai',
        title: 'Estimated Arrival',
        location: 'Mumbai Bhiwandi Gateway',
        verificationState: 'ESTIMATED',
        time: '07:40 PM (Predicted)',
        targetMapId: 'wp_mumbai',
        isProof: false,
        proofType: 'Predictive ETA Model',
        proofDetails: 'Dock Bay 4B reserved. Multi-signature unsealing required.',
        hash: 'ESTIMATE: REVISED (+1h 20m)'
      }
    ],

    alerts: [
      {
        what: 'ETA DELAY',
        severity: 'delay',
        where: 'Near Surat (NH 48 Km 260)',
        when: '14:48 IST',
        howLong: '42 minute stop',
        why: 'Traffic congestion & monsoon runoff',
        impact: '+1h 20m ETA impact (Revised arrival: 7:40 PM)',
        targetId: 'wp_surat_hazard'
      },
      {
        what: 'LONG DWELL DETECTED',
        severity: 'delay',
        where: 'Surat North Hazard Zone',
        when: '14:06 - 14:48 IST',
        howLong: '42 minutes stationary',
        why: 'Choke point waiting on arterial service lane',
        impact: 'Exceeded 15m normal stop threshold; flagged for dispatcher review',
        targetId: 'wp_surat_hazard'
      },
      {
        what: 'QUANTITY MISMATCH',
        severity: 'critical',
        where: 'Manifest Audit (Bharuch / Surat)',
        when: '15:10 IST',
        howLong: 'Permanent discrepancy',
        why: '2 units container seal moisture breach during transit',
        impact: '500 loaded ➔ 498 received. Discrepancy logged for dock receipt.',
        targetId: 'wp_bharuch'
      }
    ]
  },

  'SC-1052': {
    id: 'SC-1052',
    vehiclePlate: 'MH04AB5678',
    vehicleType: 'Refrigerated 24FT Rigid Truck',
    corridorName: 'Ahmedabad → Vadodara Express Spur',
    origin: 'Ahmedabad Fulfillment Hub',
    destination: 'Vadodara Central Depot',
    currentLocation: 'Anand Expressway Km 75',
    speedKmh: 68,
    heading: 'South-East',
    gpsUpdatedAgo: '1 min ago',
    eta: '04:15 PM (On Schedule)',
    etaDelayImpact: '0m (On Time)',
    status: 'green',
    isDeviated: false,
    dwellStatus: 'normal_stop',
    dwellDuration: '8 min',
    routeFraction: 0.22,

    driver: {
      name: 'Amitabh Sen',
      id: 'DRV-IN-8812',
      experience: '8 Years Logistics',
      license: 'MH04-2015881920',
      status: 'On Route',
      assignedVehicle: 'MH04AB5678',
      currentLocation: 'Anand Expressway Km 75',
      dutyHours: '3h 10m / Max 9h',
      lastVerifiedEvent: 'Nadiad Toll FASTag (02:15 PM)',
      biometricConfidence: '99.5% Match'
    },

    quantity: {
      ordered: 300,
      loaded: 300,
      transferred: 300,
      received: 300,
      difference: 0,
      variancePercent: '0.00%',
      hasMismatch: false,
      mismatchReason: '100% complete reconciliation verified.'
    },

    timelineEvents: [
      {
        id: 'tl_1052_loaded',
        title: 'Loaded',
        location: 'Ahmedabad Hub',
        verificationState: 'VERIFIED',
        time: '01:15 PM',
        targetMapId: 'wp_ahmedabad',
        isProof: true,
        proofType: 'Cold-Chain Manifest',
        proofDetails: '300 units loaded at -18.4°C.',
        hash: '0x11ab88720199482bf4788c001290bb3'
      },
      {
        id: 'tl_1052_nadiad',
        title: 'Checkpoint',
        location: 'Nadiad Toll',
        verificationState: 'VERIFIED',
        time: '02:15 PM',
        targetMapId: 'wp_nadiad',
        isProof: true,
        proofType: 'RFID FASTag & Weigh-In-Motion',
        proofDetails: 'Speed: 68 km/h. Automated weight verified by System.',
        hash: '0x2289190ab1288cd'
      },
      {
        id: 'tl_1052_normal_stop',
        title: 'Normal Stop (8m)',
        location: 'Nadiad Rest Area',
        verificationState: 'VERIFIED',
        time: '02:30 PM',
        targetMapId: 'wp_nadiad',
        isProof: true,
        proofType: 'Driver Brief Rest',
        proofDetails: 'Duration: 8 min. Normal stop below dwell alert threshold.',
        hash: 'REST-NORMAL-8M'
      },
      {
        id: 'tl_1052_live',
        title: 'Current Location',
        location: 'Anand Expressway',
        verificationState: 'LIVE GPS',
        time: '03:50 PM',
        targetMapId: 'truck',
        isProof: false,
        proofType: 'Live GPS Satellite Telemetry',
        proofDetails: 'Cruising smoothly at 68 km/h. Distance to Vadodara: 35 km.',
        hash: 'GPS-STREAM: 22.5645N, 72.9289E'
      }
    ],

    alerts: [
      {
        what: 'ON SCHEDULE',
        severity: 'verified',
        where: 'Anand Expressway Km 75',
        when: '1 min ago',
        howLong: 'Continuous movement',
        why: 'Clear corridor traffic conditions',
        impact: 'Expected arrival 04:15 PM (0m variance)',
        targetId: 'truck'
      }
    ]
  },

  'SC-1060': {
    id: 'SC-1060',
    vehiclePlate: 'GJ06TR9011',
    vehicleType: 'Heavy Flatbed Container Carrier',
    corridorName: 'Vadodara → Mumbai Heavy Freight Corridor',
    origin: 'Vadodara Heavy Consolidation Hub',
    destination: 'Mumbai Nhava Sheva Port',
    currentLocation: 'Off Planned NH 48 (State Highway Bypass)',
    speedKmh: 24,
    heading: 'South-West',
    gpsUpdatedAgo: 'Just now',
    eta: '09:40 PM',
    etaDelayImpact: '+2h 35m',
    status: 'red',
    isDeviated: true,
    dwellStatus: 'long_dwell',
    dwellDuration: '38 min',
    routeFraction: 0.65,

    driver: {
      name: 'Mohd. Salim',
      id: 'DRV-IN-7719',
      experience: '15 Years Heavy Haul',
      license: 'GJ06-2009188271',
      status: 'Delayed',
      assignedVehicle: 'GJ06TR9011',
      currentLocation: 'Off Planned Route (Bypass SH-168)',
      dutyHours: '6h 45m / Max 9h',
      lastVerifiedEvent: 'Bharuch Weighbridge (01:40 PM)',
      biometricConfidence: '99.1% Match'
    },

    quantity: {
      ordered: 650,
      loaded: 650,
      transferred: 650,
      received: 642,
      difference: -8,
      variancePercent: '-1.23%',
      hasMismatch: true,
      mismatchReason: '8 crates unaccounted during Surat municipal bypass transition.'
    },

    timelineEvents: [
      {
        id: 'tl_1060_loaded',
        title: 'Loaded',
        location: 'Vadodara Hub',
        verificationState: 'VERIFIED',
        time: '10:00 AM',
        targetMapId: 'wp_vadodara',
        isProof: true,
        proofType: 'Warehouse Manifest',
        proofDetails: '650 industrial crates loaded.',
        hash: '0x88921bcf901278891ac39'
      },
      {
        id: 'tl_1060_deviated',
        title: 'Route Deviation Alert',
        location: 'Surat Bypass SH-168',
        verificationState: 'NOT VERIFIED',
        time: '03:15 PM',
        targetMapId: 'wp_surat_hazard',
        isProof: false,
        proofType: 'Planned Route Departure Warning',
        proofDetails: 'Vehicle deviated 14 km away from scheduled NH 48 corridor.',
        hash: 'ALERT: ROUTE DEVIATION DETECTED'
      },
      {
        id: 'tl_1060_live',
        title: 'Current Movement',
        location: 'Off Planned Route',
        verificationState: 'LIVE GPS',
        time: '03:54 PM',
        targetMapId: 'truck',
        isProof: false,
        proofType: 'GPS Telemetry (Off-Corridor)',
        proofDetails: 'Speed: 24 km/h. Moving through secondary bypass SH-168.',
        hash: 'GPS-STREAM: 21.0821N, 73.0112E'
      }
    ],

    alerts: [
      {
        what: 'ROUTE DEVIATION',
        severity: 'critical',
        where: 'Surat Bypass (SH-168)',
        when: '15:15 IST (Active)',
        howLong: '14 km off corridor',
        why: 'Vehicle diverted to avoid primary toll gate',
        impact: 'Planned: Surat → Mumbai. Current: Off planned route. Audit flag raised.',
        targetId: 'wp_surat_hazard'
      },
      {
        what: 'CHECKPOINT NOT VERIFIED',
        severity: 'critical',
        where: 'Surat South Gantry',
        when: '15:15 IST',
        howLong: 'Bypass event',
        why: 'Mandatory weigh lane 02 bypassed',
        impact: 'Manual seal inspection required at Vapi border',
        targetId: 'wp_surat_hazard'
      }
    ]
  },

  'SC-1077': {
    id: 'SC-1077',
    vehiclePlate: 'MH12PQ3344',
    vehicleType: 'Heavy Reefer Bi-Temp Truck',
    corridorName: 'Surat → Mumbai Cold Express',
    origin: 'Surat Seafood Processing Terminal',
    destination: 'Mumbai Nhava Sheva International Gate',
    currentLocation: 'Vapi Border Approach Km 380',
    speedKmh: 54,
    heading: 'South',
    gpsUpdatedAgo: 'Just now',
    eta: '06:30 PM',
    etaDelayImpact: '+25m',
    status: 'blue',
    isDeviated: false,
    dwellStatus: 'in_motion',
    dwellDuration: '0 min',
    routeFraction: 0.78,

    driver: {
      name: 'Vikram Patil',
      id: 'DRV-IN-6623',
      experience: '10 Years Reefer Corridor',
      license: 'MH12-2014902188',
      status: 'On Route',
      assignedVehicle: 'MH12PQ3344',
      currentLocation: 'Vapi Border Approach Km 380',
      dutyHours: '4h 15m / Max 9h',
      lastVerifiedEvent: 'Navsari Transit Gate (02:45 PM)',
      biometricConfidence: '99.7% Match'
    },

    quantity: {
      ordered: 1200,
      loaded: 1200,
      transferred: 1200,
      received: 1195,
      difference: -5,
      variancePercent: '-0.42%',
      hasMismatch: true,
      mismatchReason: '5 master cartons quarantined due to moisture condensation sensor trip.'
    },

    timelineEvents: [
      {
        id: 'tl_1077_loaded',
        title: 'Loaded',
        location: 'Surat Terminal',
        verificationState: 'VERIFIED',
        time: '01:00 PM',
        targetMapId: 'wp_surat_hazard',
        isProof: true,
        proofType: 'Export Health Certificate',
        proofDetails: '1,200 cartons loaded at -22.1°C.',
        hash: '0x99a012bcefa401889'
      },
      {
        id: 'tl_1077_live',
        title: 'Current Location',
        location: 'Vapi Border Approach',
        verificationState: 'LIVE GPS',
        time: '03:54 PM',
        targetMapId: 'truck',
        isProof: false,
        proofType: 'Live GPS Fleet Stream',
        proofDetails: 'Approaching Vapi border gate at 54 km/h.',
        hash: 'GPS-STREAM: 20.3712N, 72.9042E'
      }
    ],

    alerts: [
      {
        what: 'QUANTITY MISMATCH',
        severity: 'delay',
        where: 'Surat Marine Terminal',
        when: '01:00 IST',
        howLong: 'Dock audit',
        why: '5 cartons quarantined due to moisture condensation sensor trip',
        impact: '1,200 loaded ➔ 1,195 received; exception logged',
        targetId: 'wp_surat_hazard'
      }
    ]
  }
};

// CHECKPOINTS DATABASE
const CHECKPOINTS_DATABASE = [
  { id: 'cp-01', name: 'Ahmedabad Hub Security Gate', location: 'Ahmedabad (Km 0)', shipment: 'SC-1048', vehicle: 'GJ01XX1234', expectedTime: '08:15 AM', actualTime: '08:30 AM', status: 'passed', method: 'RFID FASTag & Gross Scale', timestamp: '08:30 AM IST', verifiedBy: 'Security Automation Gate 01' },
  { id: 'cp-02', name: 'Nadiad Toll Gateway', location: 'Nadiad (Km 55)', shipment: 'SC-1048', vehicle: 'GJ01XX1234', expectedTime: '09:30 AM', actualTime: '09:45 AM', status: 'passed', method: 'RFID FASTag Lane 04', timestamp: '09:45 AM IST', verifiedBy: 'NHAI Toll Gantry' },
  { id: 'cp-03', name: 'Vadodara Central Checkpoint', location: 'Vadodara (Km 110)', shipment: 'SC-1048', vehicle: 'GJ01XX1234', expectedTime: '11:00 AM', actualTime: '11:26 AM', status: 'passed', method: 'QR Verification & Biometrics', timestamp: '11:26 AM IST', verifiedBy: 'Verified by Dispatcher (Insp. S. Rathore)' },
  { id: 'cp-04', name: 'Bharuch Weighbridge Gantry', location: 'Bharuch (Km 190)', shipment: 'SC-1048', vehicle: 'GJ01XX1234', expectedTime: '01:00 PM', actualTime: '01:15 PM', status: 'passed', method: 'Automated Weigh-In-Motion (38.4T)', timestamp: '01:15 PM IST', verifiedBy: 'Gujarat RTO Enforcement' },
  { id: 'cp-05', name: 'Surat North Congestion Gantry', location: 'Surat (Km 260)', shipment: 'SC-1048', vehicle: 'GJ01XX1234', expectedTime: '02:30 PM', actualTime: '14:48 PM', status: 'delayed', method: 'Incident Sensor & Manual Queue', timestamp: '14:48 PM IST', verifiedBy: 'Surat Traffic Control #TRF-902' },
  { id: 'cp-06', name: 'Surat South Gantry Bypass', location: 'Surat SH-168', shipment: 'SC-1060', vehicle: 'GJ06TR9011', expectedTime: '03:00 PM', actualTime: 'Bypassed', status: 'not_verified', method: 'Geofence Exit Without Scan', timestamp: '15:15 PM IST', verifiedBy: 'Automated Audit Exception' },
  { id: 'cp-07', name: 'Vapi Inter-State Border Post', location: 'Vapi (Km 390)', shipment: 'SC-1048', vehicle: 'GJ01XX1234', expectedTime: '05:40 PM', actualTime: 'Pending', status: 'upcoming', method: 'Scheduled E-Way QR Scan', timestamp: 'Pending', verifiedBy: 'Maharashtra Border Post' },
  { id: 'cp-08', name: 'Mumbai Bhiwandi Terminal Yard', location: 'Mumbai (Km 525)', shipment: 'SC-1048', vehicle: 'GJ01XX1234', expectedTime: '07:40 PM', actualTime: 'Pending', status: 'upcoming', method: 'Consignee Unsealing & Receipt', timestamp: 'Pending', verifiedBy: 'Bhiwandi Dock Inspector' }
];

// AUDIT TRAIL LOG
const AUDIT_TRAIL_LOG = [
  { time: '15:52 PM', event: 'Live GPS Heartbeat Telemetry', location: 'Near Surat (Km 285)', shipment: 'SC-1048', actor: 'Satellite Stream', status: 'live', method: 'IRNSS/GPS 2.4GHz', details: 'Speed: 46 km/h, Heading: 168° SSE, 2 min freshness' },
  { time: '15:15 PM', event: 'Route Deviation Detected (14 km Off-Route)', location: 'Surat Bypass SH-168', shipment: 'SC-1060', actor: 'Automated Policy Engine', status: 'critical', method: 'Corridor Boundary Violation', details: 'Vehicle diverted away from planned NH48 corridor' },
  { time: '15:10 PM', event: 'Quantity Mismatch Audit Flag Raised', location: 'Manifest Audit (Bharuch)', shipment: 'SC-1048', actor: 'Audit Ledger Node', status: 'critical', method: '4-Stage Custody Hash Comparison', details: '500 Loaded vs 498 Received (-2 units difference)' },
  { time: '14:48 PM', event: 'Long Dwell Hold Registered (42 min)', location: 'Surat North Hazard', shipment: 'SC-1048', actor: 'Surat Traffic Dispatch', status: 'delay', method: 'Incident Log #TRF-902', details: 'Stationary wait due to monsoon waterlogging' },
  { time: '11:26 AM', event: 'Vadodara Checkpoint Verified', location: 'Vadodara Checkpoint', shipment: 'SC-1048', actor: 'Insp. S. Rathore (GUJ-POL-8821)', status: 'verified', method: 'Physical QR Scan & Biometrics', details: 'Cargo seal intact, vehicle weight verified' },
  { time: '10:58 AM', event: 'Vehicle Entered Vadodara Geofence', location: 'Vadodara Perimeter (40km)', shipment: 'SC-1048', actor: 'Geofence RF Transponder', status: 'live', method: 'Automated RF Handshake', details: 'Geofence entry logged before verification' },
  { time: '08:30 AM', event: 'Gate Out Security Clearance', location: 'Ahmedabad Security Gate', shipment: 'SC-1048', actor: 'Security Dispatcher', status: 'verified', method: 'RFID FASTag & Gross Scale', details: 'Gross weight 38,420 kg approved for departure' },
  { time: '08:00 AM', event: 'Cargo Loaded & Digital Seal Locked', location: 'Ahmedabad Fulfillment Hub', shipment: 'SC-1048', actor: 'Dock Supervisor (P. Sharma)', status: 'verified', method: 'E-Seal #SC-EL-9921 Lock', details: '500 industrial units loaded into refrigerated bay' }
];

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  initMapRenderer();
  initTimelineScrubber();
  initTabsNavigation();
  initEventHandlers();
  loadShipment(StampChainState.activeShipmentId);
  startLiveTelemetryLoop();
});

/**
 * 🔀 CLIENT-SIDE ROUTER & AUTHENTICATION
 */
function initRouter() {
  document.querySelectorAll('.nav-item-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navigateTo(btn.getAttribute('data-page'));
    });
  });

  document.querySelectorAll('.mobile-nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      navigateTo(btn.getAttribute('data-page'));
    });
  });
}

function navigateTo(pageId, params = {}) {
  StampChainState.currentPage = pageId;

  document.querySelectorAll('.nav-item-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-page') === pageId);
  });
  document.querySelectorAll('.mobile-nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-page') === pageId);
  });

  document.querySelectorAll('.page-container').forEach(page => {
    page.classList.remove('page-active');
  });

  const targetPage = document.getElementById(`page-${pageId.replace('_', '-')}`);
  if (targetPage) {
    targetPage.classList.add('page-active');
  }

  if (pageId === 'dashboard') {
    setTimeout(resizeMap, 50);
  } else if (pageId === 'shipments') {
    renderShipmentsPage();
  } else if (pageId === 'shipment_details') {
    if (params.shipmentId) StampChainState.activeShipmentId = params.shipmentId;
    renderShipmentDetailsPage();
  } else if (pageId === 'live_tracking') {
    renderLiveTrackingPage();
  } else if (pageId === 'checkpoints') {
    renderCheckpointsPage();
  } else if (pageId === 'alerts') {
    renderAlertsPage();
  } else if (pageId === 'analytics') {
    renderAnalyticsPage();
  } else if (pageId === 'audit') {
    renderAuditTrailPage();
  } else if (pageId === 'settings') {
    renderSettingsPage();
  } else if (pageId === 'role_cockpit') {
    renderRoleCockpit();
  }
}

/**
 * 👑 AUTHENTICATION & ROLE SWITCHER
 */
function loginRole(roleKey) {
  const overlay = document.getElementById('loginOverlay');
  if (overlay) overlay.style.display = 'none';

  if (roleKey === 'driver') {
    StampChainState.currentUser = { name: 'Rajesh Kumar', email: 'rajesh.k@fleet.in', role: 'driver', roleLabel: 'Driver (Rajesh Kumar)' };
    navigateTo('role_cockpit');
  } else if (roleKey === 'warehouse') {
    StampChainState.currentUser = { name: 'P. Sharma', email: 'dock.ahmedabad@stampchain.io', role: 'warehouse', roleLabel: 'Warehouse Staff (Ahmedabad)' };
    navigateTo('role_cockpit');
  } else if (roleKey === 'receiver') {
    StampChainState.currentUser = { name: 'S. Mehta (Consignee)', email: 'receiver.mumbai@stampchain.io', role: 'receiver', roleLabel: 'Receiver (Mumbai Gateway)' };
    navigateTo('role_cockpit');
  } else {
    StampChainState.currentUser = { name: 'Chief Dispatcher', email: 'admin@stampchain.io', role: 'admin', roleLabel: 'Admin / Dispatcher' };
    navigateTo('dashboard');
  }

  const profileLabel = document.getElementById('headerRoleLabel');
  if (profileLabel) profileLabel.innerText = StampChainState.currentUser.roleLabel;
}

function promptRoleSwitch() {
  const overlay = document.getElementById('loginOverlay');
  if (overlay) overlay.style.display = 'grid';
}

function logout() {
  promptRoleSwitch();
}

/**
 * 📦 PAGE 2: SHIPMENTS DIRECTORY
 */
function renderShipmentsPage() {
  const container = document.getElementById('shipmentsTableBody');
  if (!container) return;

  const shipments = Object.values(SHIPMENTS_DATABASE);
  const filter = StampChainState.searchFilter.toLowerCase();

  const filtered = shipments.filter(s => {
    return s.id.toLowerCase().includes(filter) ||
           s.vehiclePlate.toLowerCase().includes(filter) ||
           s.driver.name.toLowerCase().includes(filter) ||
           s.origin.toLowerCase().includes(filter) ||
           s.destination.toLowerCase().includes(filter);
  });

  container.innerHTML = filtered.map(s => {
    let statusPillClass = 'status-on-route';
    let statusText = 'ON-ROUTE';
    if (s.status === 'red') { statusPillClass = 'status-delayed'; statusText = '⚠ DEVIATED'; }
    else if (s.status === 'amber') { statusPillClass = 'status-delayed'; statusText = 'DELAYED'; }
    else if (s.status === 'blue') { statusPillClass = 'hud-live-tag'; statusText = 'LIVE GPS'; }

    return `
      <tr onclick="openShipmentDetails('${s.id}')">
        <td style="font-family: var(--font-mono); font-weight: 800; color: var(--color-live);">${s.id}</td>
        <td><strong>${s.origin}</strong> ➔ ${s.destination}</td>
        <td style="font-family: var(--font-mono);">${s.vehiclePlate}</td>
        <td>${s.driver.name} 👤</td>
        <td>${s.currentLocation}</td>
        <td><span class="status-pill ${statusPillClass}">${statusText}</span></td>
        <td style="font-family: var(--font-mono); color: ${s.status === 'amber' ? 'var(--color-delay)' : 'var(--text-primary)'};">${s.eta}</td>
        <td><span class="status-pill ${s.quantity.hasMismatch ? 'status-delayed' : 'status-on-route'}">${s.quantity.hasMismatch ? 'MISMATCH (-2)' : '100% VERIFIED'}</span></td>
        <td><button class="header-btn" style="padding: 3px 8px; font-size: 10px;">Inspect ➔</button></td>
      </tr>
    `;
  }).join('');
}

function openShipmentDetails(shipmentId) {
  loadShipment(shipmentId);
  navigateTo('shipment_details', { shipmentId });
}

/**
 * 🔍 PAGE: SHIPMENT DETAILS VIEW
 */
function renderShipmentDetailsPage() {
  const s = SHIPMENTS_DATABASE[StampChainState.activeShipmentId];
  if (!s) return;

  const titleEl = document.getElementById('shipmentDetailsHeaderTitle');
  const bodyEl = document.getElementById('shipmentDetailsContent');
  if (titleEl) titleEl.innerText = `${s.id} — ${s.vehiclePlate} (${s.origin} ➔ ${s.destination})`;

  if (!bodyEl) return;

  bodyEl.innerHTML = `
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 16px;">
      
      <!-- Left Column: Overview, Timeline, & Quantity -->
      <div style="display: flex; flex-direction: column; gap: 16px;">
        
        <div class="role-cockpit-card">
          <div class="cockpit-header-row">
            <div>
              <h3 style="color: #ffffff; font-size: 14px;">Shipment Overview & Telemetry</h3>
              <p style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">Assigned Corridor: ${s.corridorName}</p>
            </div>
            <span class="status-pill ${s.status === 'green' ? 'status-on-route' : (s.status === 'red' ? 'status-delayed' : 'hud-live-tag')}">
              ${s.status.toUpperCase()}
            </span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; font-size: 11px;">
            <div><span style="color: var(--text-muted);">VEHICLE:</span> <strong style="color: var(--color-live); font-family: var(--font-mono);">${s.vehiclePlate}</strong></div>
            <div><span style="color: var(--text-muted);">DRIVER:</span> <strong>${s.driver.name}</strong></div>
            <div><span style="color: var(--text-muted);">SPEED:</span> <strong style="font-family: var(--font-mono);">${s.speedKmh} KM/H</strong></div>
            <div><span style="color: var(--text-muted);">LOCATION:</span> <strong>${s.currentLocation}</strong></div>
            <div><span style="color: var(--text-muted);">ETA:</span> <strong style="color: var(--color-delay); font-family: var(--font-mono);">${s.eta} (${s.etaDelayImpact})</strong></div>
            <div><span style="color: var(--text-muted);">DWELL:</span> <strong>${s.dwellDuration} (${s.dwellStatus})</strong></div>
          </div>
        </div>

        <!-- Quantity Reconciliation Bar -->
        <div class="quantity-reconciliation-card">
          <div class="card-title" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span>Chain of Custody Reconciliation</span>
            <span class="status-pill ${s.quantity.hasMismatch ? 'status-delayed' : 'status-on-route'}">${s.quantity.hasMismatch ? 'MISMATCH' : '100% MATCH'}</span>
          </div>
          <div class="quantity-pipeline">
            <div class="quantity-step">
              <span class="step-name">Ordered</span>
              <div class="step-dot">${s.quantity.ordered}</div>
              <span class="step-units">${s.quantity.ordered} U</span>
            </div>
            <div class="quantity-arrow">➔</div>
            <div class="quantity-step">
              <span class="step-name">Loaded</span>
              <div class="step-dot">${s.quantity.loaded}</div>
              <span class="step-units">${s.quantity.loaded} U</span>
            </div>
            <div class="quantity-arrow">➔</div>
            <div class="quantity-step">
              <span class="step-name">Transferred</span>
              <div class="step-dot">${s.quantity.transferred}</div>
              <span class="step-units">${s.quantity.transferred} U</span>
            </div>
            <div class="quantity-arrow">➔</div>
            <div class="quantity-step ${s.quantity.hasMismatch ? 'mismatch' : ''}">
              <span class="step-name">Received</span>
              <div class="step-dot">${s.quantity.received}</div>
              <span class="step-units" style="${s.quantity.hasMismatch ? 'color: var(--color-delay); font-weight: 800;' : ''}">${s.quantity.received} U</span>
            </div>
          </div>
          ${s.quantity.hasMismatch ? `
            <div class="quantity-mismatch-banner">
              <span>⚠ QUANTITY MISMATCH: ${Math.abs(s.quantity.difference)} units difference (${s.quantity.variancePercent})</span>
            </div>
            <div style="font-size: 10.5px; color: var(--text-secondary); margin-top: 6px;">Root Cause: ${s.quantity.mismatchReason}</div>
          ` : ''}
        </div>

        <!-- Verified Journey Timeline -->
        <div class="role-cockpit-card">
          <h3 style="color: #ffffff; font-size: 13px; margin-bottom: 8px;">Verified Journey Timeline & Evidence</h3>
          <div class="connected-timeline-container">
            ${s.timelineEvents.map(evt => `
              <div class="timeline-event-card ${evt.verificationState === 'VERIFIED' ? 'event-verified' : (evt.verificationState === 'LIVE GPS' ? 'event-live' : 'event-delay')}">
                <div class="timeline-card-header">
                  <span style="font-weight: 700; color: #ffffff;">${evt.title} — ${evt.location}</span>
                  <span class="status-pill ${evt.isProof ? 'status-on-route' : 'status-waiting'}">${evt.verificationState}</span>
                </div>
                <div style="font-size: 10.5px; color: var(--text-secondary); margin-top: 4px;">
                  <div>${evt.proofType}: ${evt.proofDetails}</div>
                  <div style="font-family: var(--font-mono); font-size: 9px; color: var(--text-muted); margin-top: 2px;">HASH: ${evt.hash}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

      <!-- Right Column: Driver Profile & Active Alerts -->
      <div style="display: flex; flex-direction: column; gap: 16px;">
        
        <div class="role-cockpit-card">
          <div class="cockpit-header-row">
            <h3 style="color: #ffffff; font-size: 13px;">Assigned Driver Profile</h3>
            <span class="status-pill status-${s.driver.status.toLowerCase()}">${s.driver.status}</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 11px;">
            <div><span style="color: var(--text-muted);">NAME:</span> <strong>${s.driver.name} 👤</strong></div>
            <div><span style="color: var(--text-muted);">DRIVER ID:</span> <strong style="font-family: var(--font-mono);">${s.driver.id}</strong></div>
            <div><span style="color: var(--text-muted);">LICENSE:</span> <strong style="font-family: var(--font-mono);">${s.driver.license}</strong></div>
            <div><span style="color: var(--text-muted);">DUTY HOURS:</span> <strong>${s.driver.dutyHours}</strong></div>
            <div><span style="color: var(--text-muted);">BIOMETRIC CONFIDENCE:</span> <strong style="color: var(--color-verified);">${s.driver.biometricConfidence}</strong></div>
            <div><span style="color: var(--text-muted);">LAST VERIFIED:</span> <strong>${s.driver.lastVerifiedEvent}</strong></div>
          </div>
        </div>

        <div class="role-cockpit-card">
          <h3 style="color: #ffffff; font-size: 13px; margin-bottom: 8px;">Active Exceptions</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${s.alerts.map(alt => `
              <div class="exception-card severity-${alt.severity}">
                <div class="exception-top">
                  <span class="exception-badge badge-${alt.severity}">${alt.what}</span>
                  <span class="exception-time">${alt.when}</span>
                </div>
                <div style="font-size: 11px; font-weight: 700; color: #ffffff;">${alt.where}</div>
                <div style="font-size: 10px; color: var(--text-secondary); margin-top: 2px;">${alt.impact}</div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

    </div>
  `;
}

/**
 * 🗺️ PAGE 3: LIVE TRACKING (MULTI-TRUCK FLEET VISUALIZATION)
 */
function renderLiveTrackingPage() {
  const container = document.getElementById('liveTrackingFleetList');
  if (!container) return;

  const shipments = Object.values(SHIPMENTS_DATABASE);
  container.innerHTML = shipments.map(s => `
    <div class="exception-card severity-${s.status === 'green' ? 'verified' : (s.status === 'red' ? 'critical' : (s.status === 'amber' ? 'delay' : 'live'))}" onclick="focusShipmentOnMap('${s.id}')">
      <div class="exception-top">
        <strong style="font-family: var(--font-mono); color: #ffffff;">${s.vehiclePlate}</strong>
        <span class="status-pill status-${s.status === 'green' ? 'on-route' : (s.status === 'red' ? 'delayed' : 'waiting')}">${s.status.toUpperCase()}</span>
      </div>
      <div style="font-size: 11.5px; font-weight: 700; color: var(--text-primary); margin: 3px 0;">${s.id} — ${s.driver.name} 👤</div>
      <div style="font-size: 10px; color: var(--text-secondary);">Location: ${s.currentLocation} • Speed: ${s.speedKmh} km/h • ETA: ${s.eta}</div>
    </div>
  `).join('');
}

function focusShipmentOnMap(shipmentId) {
  loadShipment(shipmentId);
  navigateTo('dashboard');
}

/**
 * 📍 PAGE 4: CHECKPOINTS
 */
function renderCheckpointsPage() {
  const container = document.getElementById('checkpointsTableBody');
  if (!container) return;

  const filter = StampChainState.checkpointFilter;
  const list = CHECKPOINTS_DATABASE.filter(cp => {
    if (filter === 'passed') return cp.status === 'passed';
    if (filter === 'upcoming') return cp.status === 'upcoming';
    if (filter === 'delayed') return cp.status === 'delayed';
    if (filter === 'not_verified') return cp.status === 'not_verified';
    return true;
  });

  container.innerHTML = list.map(cp => {
    let statusBadge = '<span class="status-pill status-on-route">✓ PASSED</span>';
    if (cp.status === 'delayed') statusBadge = '<span class="status-pill status-delayed">⚠ DELAYED</span>';
    if (cp.status === 'not_verified') statusBadge = '<span class="status-pill status-delayed">✕ NOT VERIFIED</span>';
    if (cp.status === 'upcoming') statusBadge = '<span class="status-pill status-waiting">○ UPCOMING</span>';

    return `
      <tr>
        <td style="font-family: var(--font-mono); font-weight: 700;">${cp.id}</td>
        <td><strong>${cp.name}</strong></td>
        <td>${cp.location}</td>
        <td style="font-family: var(--font-mono); color: var(--color-live);">${cp.shipment}</td>
        <td style="font-family: var(--font-mono);">${cp.vehicle}</td>
        <td>${cp.expectedTime}</td>
        <td style="font-weight: 700;">${cp.actualTime}</td>
        <td>${statusBadge}</td>
        <td style="font-size: 10.5px;">${cp.method}</td>
        <td style="font-size: 10px; color: var(--color-verified); font-weight: 600;">${cp.verifiedBy}</td>
      </tr>
    `;
  }).join('');
}

function filterCheckpoints(filterVal) {
  StampChainState.checkpointFilter = filterVal;
  document.querySelectorAll('.cp-filter-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-filter') === filterVal);
  });
  renderCheckpointsPage();
}

/**
 * 🚨 PAGE 5: ALERTS & EXCEPTIONS
 */
function renderAlertsPage() {
  const container = document.getElementById('alertsPageGrid');
  if (!container) return;

  const shipments = Object.values(SHIPMENTS_DATABASE);
  let allAlerts = [];
  shipments.forEach(s => {
    s.alerts.forEach(a => {
      allAlerts.push({ ...a, shipmentId: s.id, vehiclePlate: s.vehiclePlate });
    });
  });

  container.innerHTML = allAlerts.map(alt => `
    <div class="exception-card severity-${alt.severity}" style="padding: 14px;">
      <div class="exception-top">
        <span class="exception-badge badge-${alt.severity}">${alt.what}</span>
        <span style="font-family: var(--font-mono); font-size: 10px; color: var(--text-muted);">${alt.shipmentId} (${alt.vehiclePlate})</span>
      </div>
      <div class="exception-what" style="font-size: 13px; margin: 4px 0;">${alt.what}: ${alt.where}</div>
      <div class="exception-dimensions-grid" style="font-size: 11px;">
        <div class="dim-row"><span class="dim-label">WHERE:</span><span class="dim-val">${alt.where}</span></div>
        <div class="dim-row"><span class="dim-label">WHEN:</span><span class="dim-val">${alt.when}</span></div>
        <div class="dim-row"><span class="dim-label">DURATION:</span><span class="dim-val">${alt.howLong}</span></div>
        <div class="dim-row"><span class="dim-label">WHY:</span><span class="dim-val">${alt.why}</span></div>
        <div class="dim-row"><span class="dim-label">IMPACT:</span><span class="dim-val highlight-${alt.severity}">${alt.impact}</span></div>
      </div>
      <div style="display: flex; gap: 8px; margin-top: 10px;">
        <button class="header-btn primary" onclick="alert('Acknowledged alert for ${alt.shipmentId}')">Acknowledge</button>
        <button class="header-btn" onclick="openShipmentDetails('${alt.shipmentId}')">Inspect Shipment ➔</button>
      </div>
    </div>
  `).join('');
}

/**
 * 📈 PAGE 6: ANALYTICS
 */
function renderAnalyticsPage() {
  const container = document.getElementById('analyticsChartsWrapper');
  if (!container) return;

  container.innerHTML = `
    <div class="analytics-grid">
      
      <div class="analytics-chart-card">
        <div class="kpi-label">On-Time Deliveries</div>
        <div style="font-size: 24px; font-family: var(--font-mono); font-weight: 800; color: var(--color-verified);">94.2%</div>
        <div class="bar-chart-row">
          <span class="bar-label">On-Schedule</span>
          <div class="bar-track"><div class="bar-fill" style="width: 94.2%; background: var(--color-verified);"></div></div>
          <span class="bar-val">134</span>
        </div>
        <div class="bar-chart-row">
          <span class="bar-label">Delayed</span>
          <div class="bar-track"><div class="bar-fill" style="width: 5.8%; background: var(--color-delay);"></div></div>
          <span class="bar-val">8</span>
        </div>
      </div>

      <div class="analytics-chart-card">
        <div class="kpi-label">Average Delay Duration</div>
        <div style="font-size: 24px; font-family: var(--font-mono); font-weight: 800; color: var(--color-delay);">18.4 min</div>
        <div class="bar-chart-row">
          <span class="bar-label">Surat North Choke</span>
          <div class="bar-track"><div class="bar-fill" style="width: 78%; background: var(--color-delay);"></div></div>
          <span class="bar-val">42m</span>
        </div>
        <div class="bar-chart-row">
          <span class="bar-label">Bharuch Bridge</span>
          <div class="bar-track"><div class="bar-fill" style="width: 22%; background: var(--color-verified);"></div></div>
          <span class="bar-val">8m</span>
        </div>
      </div>

      <div class="analytics-chart-card">
        <div class="kpi-label">Quantity Reconciliation Rate</div>
        <div style="font-size: 24px; font-family: var(--font-mono); font-weight: 800; color: #38bdf8;">99.60%</div>
        <div class="bar-chart-row">
          <span class="bar-label">100% Match</span>
          <div class="bar-track"><div class="bar-fill" style="width: 96%; background: var(--color-verified);"></div></div>
          <span class="bar-val">138</span>
        </div>
        <div class="bar-chart-row">
          <span class="bar-label">Variance &lt; 1%</span>
          <div class="bar-track"><div class="bar-fill" style="width: 4%; background: var(--color-delay);"></div></div>
          <span class="bar-val">4</span>
        </div>
      </div>

      <div class="analytics-chart-card">
        <div class="kpi-label">Active Fleet Utilization</div>
        <div style="font-size: 24px; font-family: var(--font-mono); font-weight: 800; color: #ffffff;">89 / 142</div>
        <div class="bar-chart-row">
          <span class="bar-label">In Motion</span>
          <div class="bar-track"><div class="bar-fill" style="width: 62.6%; background: var(--color-live);"></div></div>
          <span class="bar-val">89</span>
        </div>
        <div class="bar-chart-row">
          <span class="bar-label">Dock Loading</span>
          <div class="bar-track"><div class="bar-fill" style="width: 37.4%; background: var(--border-highlight);"></div></div>
          <span class="bar-val">53</span>
        </div>
      </div>

    </div>
  `;
}

/**
 * 📜 PAGE 7: ACTIVITY / AUDIT TRAIL
 */
function renderAuditTrailPage() {
  const container = document.getElementById('auditTrailTableBody');
  if (!container) return;

  container.innerHTML = AUDIT_TRAIL_LOG.map(log => `
    <tr>
      <td style="font-family: var(--font-mono); font-weight: 700; color: var(--text-primary);">${log.time}</td>
      <td style="font-family: var(--font-mono); color: var(--color-live);">${log.shipment}</td>
      <td><strong style="color: #ffffff;">${log.event}</strong></td>
      <td>${log.location}</td>
      <td>${log.actor}</td>
      <td><span class="status-pill status-${log.status === 'verified' ? 'on-route' : (log.status === 'delay' ? 'delayed' : (log.status === 'critical' ? 'delayed' : 'waiting'))}">${log.status.toUpperCase()}</span></td>
      <td style="font-size: 10.5px;">${log.method}</td>
      <td style="font-size: 10px; color: var(--text-secondary);">${log.details}</td>
    </tr>
  `).join('');
}

/**
 * ⚙️ PAGE 8: SETTINGS
 */
function renderSettingsPage() {
  const container = document.getElementById('settingsPageContent');
  if (!container) return;

  container.innerHTML = `
    <div class="role-cockpit-card" style="max-width: 600px;">
      <h3 style="color: #ffffff; font-size: 14px; margin-bottom: 12px;">System & Ledger Preferences</h3>
      <div style="display: flex; flex-direction: column; gap: 12px; font-size: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>Telemetry Refresh Interval</span>
          <span style="font-family: var(--font-mono); font-weight: 700; color: var(--color-live);">1000 ms</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>Corridor Geofence Detection Radius</span>
          <span style="font-family: var(--font-mono); font-weight: 700;">40 KM Perimeter</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>Stationary Dwell Alert Threshold</span>
          <span style="font-family: var(--font-mono); font-weight: 700; color: var(--color-delay);">&gt; 15 Minutes</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>Active Immutable Ledger Node</span>
          <span style="font-family: var(--font-mono); font-weight: 700; color: var(--color-verified);">STAMP-MAINNET-01 (Synced)</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * 👔 ROLE-BASED COCKPIT VIEWS
 */
function renderRoleCockpit() {
  const container = document.getElementById('roleCockpitWrapper');
  if (!container) return;

  const role = StampChainState.currentUser.role;
  const s = SHIPMENTS_DATABASE['SC-1048'];

  if (role === 'driver') {
    container.innerHTML = `
      <div class="role-cockpit-card">
        <div class="cockpit-header-row">
          <div>
            <h2 style="color: #ffffff; font-size: 16px;">Driver Cockpit — ${s.driver.name}</h2>
            <p style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">Assigned Vehicle: ${s.vehiclePlate} • License: ${s.driver.license}</p>
          </div>
          <span class="status-pill status-delayed">DELAYED (MONSOON TRAFFIC)</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; background: var(--bg-tertiary); padding: 12px; border-radius: 6px;">
          <div><span style="font-size: 9px; color: var(--text-muted);">SPEED</span><div style="font-size: 20px; font-family: var(--font-mono); font-weight: 800; color: var(--color-live);">${s.speedKmh} KM/H</div></div>
          <div><span style="font-size: 9px; color: var(--text-muted);">NEXT CHECKPOINT</span><div style="font-size: 14px; font-weight: 700; color: #ffffff;">Navsari Transit (35 km)</div></div>
          <div><span style="font-size: 9px; color: var(--text-muted);">HOURS OF SERVICE</span><div style="font-size: 14px; font-weight: 700; color: var(--color-verified);">${s.driver.dutyHours}</div></div>
        </div>

        <div style="display: flex; gap: 10px; margin-top: 8px;">
          <button class="login-btn" style="flex: 1;" onclick="alert('Incident logged: 42 min monsoon delay reported to dispatcher.')">⚠ Report Road Incident / Dwell</button>
          <button class="login-btn" style="flex: 1; background: #10b981; border-color: #34d399;" onclick="alert('GPS Telemetry ping sent to mainnet ledger.')">📡 Manual Telemetry Ping</button>
        </div>
      </div>
    `;
  } else if (role === 'warehouse') {
    container.innerHTML = `
      <div class="role-cockpit-card">
        <div class="cockpit-header-row">
          <div>
            <h2 style="color: #ffffff; font-size: 16px;">Ahmedabad Fulfillment Dock Control</h2>
            <p style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">Active Docks 1-4 • E-Seal Digital Locking System</p>
          </div>
          <span class="status-pill status-on-route">ALL BAYS ACTIVE</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
          <div style="background: var(--bg-tertiary); padding: 10px; border-radius: 6px; border: 1px solid var(--border-subtle);">
            <span style="font-size: 9px; color: var(--text-muted);">BAY 01</span>
            <div style="font-weight: 700; color: var(--color-verified);">SC-1048 (GJ01XX1234)</div>
            <div style="font-size: 10px; color: var(--text-secondary);">500 Units Loaded • Locked</div>
          </div>
          <div style="background: var(--bg-tertiary); padding: 10px; border-radius: 6px; border: 1px solid var(--border-subtle);">
            <span style="font-size: 9px; color: var(--text-muted);">BAY 02</span>
            <div style="font-weight: 700; color: #ffffff;">SC-1052 (MH04AB5678)</div>
            <div style="font-size: 10px; color: var(--text-secondary);">300 Units • Gate-Out Complete</div>
          </div>
          <div style="background: var(--bg-tertiary); padding: 10px; border-radius: 6px; border: 1px solid var(--border-subtle);">
            <span style="font-size: 9px; color: var(--text-muted);">BAY 03</span>
            <div style="font-weight: 700; color: var(--text-muted);">Empty Bay</div>
            <div style="font-size: 10px; color: var(--text-muted);">Ready for Inbound</div>
          </div>
          <div style="background: var(--bg-tertiary); padding: 10px; border-radius: 6px; border: 1px solid var(--border-subtle);">
            <span style="font-size: 9px; color: var(--text-muted);">BAY 04</span>
            <div style="font-weight: 700; color: var(--text-muted);">Empty Bay</div>
            <div style="font-size: 10px; color: var(--text-muted);">Ready for Inbound</div>
          </div>
        </div>

        <button class="login-btn" style="margin-top: 8px;" onclick="alert('Digital E-Seal QR Code generated for outbound vehicle.')">🔒 Scan & Issue Digital E-Seal</button>
      </div>
    `;
  } else if (role === 'receiver') {
    container.innerHTML = `
      <div class="role-cockpit-card">
        <div class="cockpit-header-row">
          <div>
            <h2 style="color: #ffffff; font-size: 16px;">Mumbai Bhiwandi Receiving Terminal</h2>
            <p style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">Inbound Shipment: SC-1048 • Expected Dock: Bay 4B</p>
          </div>
          <span class="status-pill status-delayed">ETA REVISED (7:40 PM)</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; background: var(--bg-tertiary); padding: 12px; border-radius: 6px;">
          <div><span style="font-size: 9px; color: var(--text-muted);">MANIFEST UNITS</span><div style="font-size: 18px; font-family: var(--font-mono); font-weight: 800; color: #ffffff;">500 Ordered</div></div>
          <div><span style="font-size: 9px; color: var(--text-muted);">EXPECTED RECEIPT</span><div style="font-size: 18px; font-family: var(--font-mono); font-weight: 800; color: var(--color-delay);">498 Units (-2)</div></div>
          <div><span style="font-size: 9px; color: var(--text-muted);">COLD COMPLIANCE</span><div style="font-size: 18px; font-family: var(--font-mono); font-weight: 800; color: var(--color-verified);">-18.2°C OK</div></div>
        </div>

        <button class="login-btn" style="background: #10b981; border-color: #34d399; margin-top: 8px;" onclick="alert('Shipment SC-1048 delivery confirmed. Multi-signature seal unsealed on ledger.')">✓ Confirm Unsealing & Receive Cargo</button>
      </div>
    `;
  }
}

/**
 * 🗺️ DASHBOARD MAP & 5-STATE ROUTE CANVAS
 */
let mapCanvas, ctx, mapSvg;

function initMapRenderer() {
  mapCanvas = document.getElementById('logisticsMapCanvas');
  if (!mapCanvas) return;
  ctx = mapCanvas.getContext('2d');
  mapSvg = document.getElementById('mapInteractiveSvg');

  window.addEventListener('resize', resizeMap);
  window.addEventListener('orientationchange', resizeMap);
  resizeMap();

  const viewport = document.getElementById('mapViewport');
  if (!viewport) return;

  viewport.addEventListener('mousedown', (e) => {
    if (e.target.closest('.map-node-group') || e.target.closest('.map-controls-floating') || e.target.closest('.map-zoom-tools') || e.target.closest('.map-hud-telemetry')) return;
    StampChainState.mapTransform.isDragging = true;
    StampChainState.mapTransform.startX = e.clientX - StampChainState.mapTransform.x;
    StampChainState.mapTransform.startY = e.clientY - StampChainState.mapTransform.y;
  });

  window.addEventListener('mousemove', (e) => {
    if (!StampChainState.mapTransform.isDragging) return;
    StampChainState.mapTransform.x = e.clientX - StampChainState.mapTransform.startX;
    StampChainState.mapTransform.y = e.clientY - StampChainState.mapTransform.startY;
    drawMapCanvas();
    updateSvgNodePositions();
  });

  window.addEventListener('mouseup', () => {
    StampChainState.mapTransform.isDragging = false;
  });

  viewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    StampChainState.mapTransform.scale = Math.min(Math.max(StampChainState.mapTransform.scale * zoomFactor, 0.6), 2.5);
    drawMapCanvas();
    updateSvgNodePositions();
  }, { passive: false });
}

function resizeMap() {
  const viewport = document.getElementById('mapViewport');
  if (!viewport || !mapCanvas) return;
  mapCanvas.width = viewport.clientWidth * window.devicePixelRatio;
  mapCanvas.height = viewport.clientHeight * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  
  if (StampChainState.mapTransform.x === 0 && StampChainState.mapTransform.y === 0) {
    StampChainState.mapTransform.x = (viewport.clientWidth - 950) / 2;
    StampChainState.mapTransform.y = (viewport.clientHeight - 850) / 2;
  }

  drawMapCanvas();
  renderSvgNodes();
}

function drawMapCanvas() {
  if (!mapCanvas || !ctx) return;
  const width = mapCanvas.width / window.devicePixelRatio;
  const height = mapCanvas.height / window.devicePixelRatio;

  ctx.save();
  ctx.clearRect(0, 0, width, height);

  ctx.translate(StampChainState.mapTransform.x, StampChainState.mapTransform.y);
  ctx.scale(StampChainState.mapTransform.scale, StampChainState.mapTransform.scale);

  drawGeospatialGrid();
  drawGeographicBase();

  if (StampChainState.showGeofences) {
    drawGeofences();
  }

  draw5StateRoutes();

  ctx.restore();
}

function drawGeospatialGrid() {
  ctx.save();
  ctx.strokeStyle = 'rgba(30, 41, 59, 0.35)';
  ctx.lineWidth = 1;
  const gridSize = 40;
  for (let x = -200; x < 1400; x += gridSize) {
    ctx.beginPath(); ctx.moveTo(x, -200); ctx.lineTo(x, 1200); ctx.stroke();
  }
  for (let y = -200; y < 1200; y += gridSize) {
    ctx.beginPath(); ctx.moveTo(-200, y); ctx.lineTo(1400, y); ctx.stroke();
  }
  ctx.restore();
}

function drawGeographicBase() {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(60, 40);
  ctx.bezierCurveTo(90, 150, 130, 260, 190, 360);
  ctx.bezierCurveTo(240, 430, 310, 520, 340, 620);
  ctx.bezierCurveTo(370, 710, 430, 800, 490, 920);
  ctx.lineTo(-200, 920);
  ctx.lineTo(-200, 40);
  ctx.closePath();

  ctx.fillStyle = 'rgba(2, 6, 23, 0.7)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(14, 116, 144, 0.3)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.font = "800 10px 'JetBrains Mono', monospace";
  ctx.fillStyle = "rgba(71, 85, 105, 0.6)";
  ctx.fillText("GULF OF KHAMBHAT", 110, 290);
  ctx.fillText("ARABIAN SEA", 210, 650);
  ctx.fillText("NH 48 FREIGHT CORRIDOR", 460, 210);
  ctx.restore();
}

function drawGeofences() {
  ctx.save();
  GEOFENCE_AREAS.forEach(geo => {
    ctx.beginPath();
    ctx.arc(geo.x, geo.y, geo.radius, 0, Math.PI * 2);
    ctx.fillStyle = geo.type === 'hazard' ? 'rgba(245, 158, 11, 0.06)' : 'rgba(6, 182, 212, 0.05)';
    ctx.fill();
    ctx.strokeStyle = geo.type === 'hazard' ? 'rgba(245, 158, 11, 0.35)' : 'rgba(6, 182, 212, 0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
  });
  ctx.restore();
}

function draw5StateRoutes() {
  const points = CORRIDOR_DATA.waypoints;
  const shipment = SHIPMENTS_DATABASE[StampChainState.activeShipmentId];
  if (points.length < 2) return;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 12;
  ctx.lineCap = 'round';
  ctx.stroke();

  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 8;
  ctx.stroke();
  ctx.restore();

  // 1. SOLID GREEN = VERIFIED JOURNEY
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i <= 3; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.restore();

  // 2. AMBER SECTION = DELAY
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(points[3].x, points[3].y);
  ctx.lineTo(points[4].x, points[4].y);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.restore();

  // 3. IF DEVIATED: RED ROUTE SECTION
  if (shipment.isDeviated) {
    const devPoints = CORRIDOR_DATA.deviationWaypoints;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(devPoints[0].x, devPoints[0].y);
    for (let i = 1; i < devPoints.length; i++) {
      ctx.lineTo(devPoints[i].x, devPoints[i].y);
    }
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 4;
    ctx.setLineDash([6, 4]);
    ctx.stroke();
    ctx.restore();
  }

  // 4. SOLID CYAN = LIVE GPS TRACKING TRAIL
  const truckPos = getInterpolatedTruckPosition();
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(points[4].x, points[4].y);
  ctx.lineTo(truckPos.x, truckPos.y);
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.restore();

  // 5. FADED DASHED = ESTIMATED UPCOMING ROUTE
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(truckPos.x, truckPos.y);
  for (let i = 5; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 3;
  ctx.setLineDash([5, 5]);
  ctx.stroke();
  ctx.restore();
}

function getInterpolatedTruckPosition() {
  const points = CORRIDOR_DATA.waypoints;
  const progress = StampChainState.currentTimeProgress;
  const totalSegments = points.length - 1;
  const segmentProgress = progress * totalSegments;
  const currentSegmentIndex = Math.min(Math.floor(segmentProgress), totalSegments - 1);
  const localFraction = segmentProgress - currentSegmentIndex;

  const p1 = points[currentSegmentIndex];
  const p2 = points[currentSegmentIndex + 1];

  let x = p1.x + (p2.x - p1.x) * localFraction;
  let y = p1.y + (p2.y - p1.y) * localFraction;

  const shipment = SHIPMENTS_DATABASE[StampChainState.activeShipmentId];
  if (shipment.isDeviated && currentSegmentIndex >= 4) {
    x += 35 * Math.sin(progress * Math.PI);
    y += 18 * Math.cos(progress * Math.PI);
  }

  const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
  return { x, y, angle, currentSegmentIndex };
}

/**
 * Render Interactive SVG Nodes with Sprites (Truck, Driver, Warehouses, Checkpoints, Dwells)
 */
function renderSvgNodes() {
  if (!mapSvg) return;
  mapSvg.innerHTML = '';

  const gContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  gContainer.setAttribute('id', 'svgViewportGroup');
  mapSvg.appendChild(gContainer);

  const t = StampChainState.mapTransform;
  gContainer.setAttribute('transform', `translate(${t.x}, ${t.y}) scale(${t.scale})`);

  const shipment = SHIPMENTS_DATABASE[StampChainState.activeShipmentId];

  // 1. Waypoints & Checkpoints
  CORRIDOR_DATA.waypoints.forEach((wp) => {
    const nodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    nodeGroup.setAttribute('class', 'map-node-group');
    nodeGroup.setAttribute('id', `node_${wp.id}`);

    let spriteHtml = '';
    let offsetX = -18;
    let offsetY = -20;

    if (wp.type === 'warehouse') {
      spriteHtml = PixelSprites.getWarehouseSvg({ isDestination: false, scale: 1 });
      offsetX = -26; offsetY = -22;
    } else if (wp.type === 'destination') {
      spriteHtml = PixelSprites.getDestinationSvg(1);
      offsetX = -21; offsetY = -21;
    } else if (wp.type === 'hazard') {
      spriteHtml = PixelSprites.getHazardSvg(1);
      offsetX = -21; offsetY = -16;
    } else {
      spriteHtml = PixelSprites.getCheckpointSvg(wp.state, 1);
    }

    let dwellBubbleHtml = '';
    if (wp.id === 'wp_surat_hazard' && shipment.dwellStatus === 'long_dwell') {
      dwellBubbleHtml = `<g transform="translate(18, -26)">${PixelSprites.getDwellBubbleSvg('42m', true, 1)}</g>`;
    } else if (wp.id === 'wp_nadiad' && shipment.dwellStatus === 'normal_stop') {
      dwellBubbleHtml = `<g transform="translate(16, -24)">${PixelSprites.getDwellBubbleSvg('8m', false, 1)}</g>`;
    }

    nodeGroup.innerHTML = `
      <g transform="translate(${wp.x + offsetX}, ${wp.y + offsetY})">
        ${spriteHtml}
        ${dwellBubbleHtml}
      </g>
      <g transform="translate(${wp.x}, ${wp.y + 24})">
        <rect x="-44" y="0" width="88" height="15" rx="3" fill="rgba(15,23,42,0.92)" stroke="${wp.state === 'delayed' ? '#f59e0b' : (wp.state === 'verified' ? '#10b981' : '#334155')}" stroke-width="0.8" />
        <text x="0" y="10.5" fill="#f8fafc" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="700" text-anchor="middle">${truncate(wp.name, 16)}</text>
      </g>
    `;

    nodeGroup.addEventListener('click', (e) => {
      e.stopPropagation();
      handleMapNodeClick(wp.id);
    });

    nodeGroup.addEventListener('mouseenter', (e) => {
      showTooltip(e, `<strong>${wp.name}</strong>`, `Status: ${wp.state.toUpperCase()} • Time: ${wp.passedTime}`);
    });
    nodeGroup.addEventListener('mouseleave', hideTooltip);

    gContainer.appendChild(nodeGroup);
  });

  // 2. Pixel Truck & Driver Character
  const truckPos = getInterpolatedTruckPosition();
  const truckGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  truckGroup.setAttribute('class', 'map-node-group');
  truckGroup.setAttribute('id', 'node_truck');

  truckGroup.innerHTML = `
    <g transform="translate(${truckPos.x - 29}, ${truckPos.y - 17})">
      ${PixelSprites.getTruckSvg({ status: shipment.status, isMoving: StampChainState.isPlaying, scale: 1 })}
    </g>
    <g transform="translate(${truckPos.x + 18}, ${truckPos.y - 22})" class="driver-token-group" data-id="driver" style="cursor: pointer;">
      ${PixelSprites.getDriverSvg(shipment.driver.status, 0.85)}
    </g>
    <g transform="translate(${truckPos.x}, ${truckPos.y + 22})">
      <rect x="-38" y="0" width="76" height="15" rx="3" fill="#0284c7" stroke="#38bdf8" stroke-width="1" />
      <text x="0" y="10.5" fill="#ffffff" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="800" text-anchor="middle">${shipment.vehiclePlate}</text>
    </g>
  `;

  truckGroup.addEventListener('click', (e) => {
    e.stopPropagation();
    if (e.target.closest('.driver-token-group')) {
      handleMapNodeClick('driver');
    } else {
      handleMapNodeClick('truck');
    }
  });

  truckGroup.addEventListener('mouseenter', (e) => {
    showTooltip(e, `<strong>${shipment.vehiclePlate}</strong> (${shipment.driver.name})`, `Speed: ${shipment.speedKmh} km/h • ETA: ${shipment.eta} • Status: ${shipment.driver.status}`);
  });
  truckGroup.addEventListener('mouseleave', hideTooltip);

  gContainer.appendChild(truckGroup);
}

function updateSvgNodePositions() {
  const gContainer = document.getElementById('svgViewportGroup');
  if (!gContainer) return;
  const t = StampChainState.mapTransform;
  gContainer.setAttribute('transform', `translate(${t.x}, ${t.y}) scale(${t.scale})`);
}

function updateTruckSvgOnly() {
  const truckGroup = document.getElementById('node_truck');
  if (!truckGroup) return;
  const truckPos = getInterpolatedTruckPosition();
  const shipment = SHIPMENTS_DATABASE[StampChainState.activeShipmentId];

  truckGroup.innerHTML = `
    <g transform="translate(${truckPos.x - 29}, ${truckPos.y - 17})">
      ${PixelSprites.getTruckSvg({ status: shipment.status, isMoving: StampChainState.isPlaying, scale: 1 })}
    </g>
    <g transform="translate(${truckPos.x + 18}, ${truckPos.y - 22})" class="driver-token-group" data-id="driver" style="cursor: pointer;">
      ${PixelSprites.getDriverSvg(shipment.driver.status, 0.85)}
    </g>
    <g transform="translate(${truckPos.x}, ${truckPos.y + 22})">
      <rect x="-38" y="0" width="76" height="15" rx="3" fill="#0284c7" stroke="#38bdf8" stroke-width="1" />
      <text x="0" y="10.5" fill="#ffffff" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="800" text-anchor="middle">${shipment.vehiclePlate}</text>
    </g>
  `;
}

function loadShipment(shipmentId) {
  StampChainState.activeShipmentId = shipmentId;
  const shipment = SHIPMENTS_DATABASE[shipmentId];
  if (!shipment) return;

  updateKpiMetrics(shipment);
  render5DAlerts(shipment);
  renderInspectorPanel();
  renderSvgNodes();
  drawMapCanvas();
  updateHudValues();
}

/**
 * 🔄 TWO-WAY SYNCHRONIZATION HANDLERS
 */
function handleMapNodeClick(nodeId) {
  StampChainState.selectedEntity = nodeId;
  StampChainState.spotlightNodeId = nodeId;

  const shipment = SHIPMENTS_DATABASE[StampChainState.activeShipmentId];
  const matchingEvent = shipment.timelineEvents.find(e => e.targetMapId === nodeId);
  if (matchingEvent) {
    StampChainState.activeTimelineEventId = matchingEvent.id;
  }

  renderSvgNodes();
  renderInspectorPanel();

  if (matchingEvent) {
    setTimeout(() => {
      const el = document.getElementById(`tl_card_${matchingEvent.id}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
  }
}

function selectTimelineEvent(eventId) {
  const shipment = SHIPMENTS_DATABASE[StampChainState.activeShipmentId];
  const event = shipment.timelineEvents.find(e => e.id === eventId);
  if (!event) return;

  StampChainState.activeTimelineEventId = event.id;
  StampChainState.selectedEntity = event.targetMapId;
  StampChainState.spotlightNodeId = event.targetMapId;

  centerMapOnTarget(event.targetMapId);
  renderSvgNodes();
  renderInspectorPanel();
}

function centerMapOnTarget(targetMapId) {
  const viewport = document.getElementById('mapViewport');
  if (!viewport) return;

  let targetX = 500;
  let targetY = 400;

  if (targetMapId === 'truck' || targetMapId === 'driver') {
    const truckPos = getInterpolatedTruckPosition();
    targetX = truckPos.x;
    targetY = truckPos.y;
  } else {
    const wp = CORRIDOR_DATA.waypoints.find(w => w.id === targetMapId);
    if (wp) {
      targetX = wp.x;
      targetY = wp.y;
    }
  }

  const vpWidth = viewport.clientWidth;
  const vpHeight = viewport.clientHeight;
  const scale = StampChainState.mapTransform.scale;

  StampChainState.mapTransform.x = (vpWidth / 2) - (targetX * scale);
  StampChainState.mapTransform.y = (vpHeight / 2) - (targetY * scale);

  drawMapCanvas();
  updateSvgNodePositions();
}

/**
 * 📋 DEEP INSPECTION DRAWER
 */
function renderInspectorPanel() {
  const body = document.getElementById('inspectorBody');
  const title = document.getElementById('inspectorTitle');
  const shipment = SHIPMENTS_DATABASE[StampChainState.activeShipmentId];
  if (!body || !shipment) return;

  if (title) title.innerText = `${shipment.id} (${shipment.vehiclePlate})`;

  if (StampChainState.activeTab === 'timeline') {
    body.innerHTML = `
      <div class="connected-timeline-container">
        ${shipment.timelineEvents.map(evt => `
          <div class="timeline-event-card ${evt.verificationState === 'VERIFIED' ? 'event-verified' : (evt.verificationState === 'LIVE GPS' ? 'event-live' : 'event-delay')}" id="tl_card_${evt.id}" onclick="selectTimelineEvent('${evt.id}')">
            <div class="timeline-card-header">
              <span style="font-weight: 700; color: #ffffff;">${evt.title}</span>
              <span class="timeline-badge ${evt.isProof ? 'badge-verified' : 'badge-live'}">${evt.verificationState}</span>
            </div>
            <div class="timeline-location-sub"><span>${evt.location}</span><span class="timeline-meta-time">${evt.time}</span></div>
            <div style="font-size: 9.5px; color: var(--text-secondary); margin-top: 4px;">
              <div>${evt.proofType}: ${evt.proofDetails}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (StampChainState.activeTab === 'quantity') {
    const q = shipment.quantity;
    body.innerHTML = `
      <div class="quantity-reconciliation-card">
        <div class="card-title">Chain of Custody Reconciliation</div>
        <div class="quantity-pipeline">
          <div class="quantity-step"><span class="step-name">Ordered</span><div class="step-dot">${q.ordered}</div><span class="step-units">${q.ordered}</span></div>
          <div class="quantity-arrow">➔</div>
          <div class="quantity-step"><span class="step-name">Loaded</span><div class="step-dot">${q.loaded}</div><span class="step-units">${q.loaded}</span></div>
          <div class="quantity-arrow">➔</div>
          <div class="quantity-step"><span class="step-name">Transferred</span><div class="step-dot">${q.transferred}</div><span class="step-units">${q.transferred}</span></div>
          <div class="quantity-arrow">➔</div>
          <div class="quantity-step ${q.hasMismatch ? 'mismatch' : ''}"><span class="step-name">Received</span><div class="step-dot">${q.received}</div><span class="step-units">${q.received}</span></div>
        </div>
        ${q.hasMismatch ? `
          <div class="quantity-mismatch-banner">
            <span>⚠ QUANTITY MISMATCH: ${Math.abs(q.difference)} units difference (${q.variancePercent})</span>
          </div>
        ` : ''}
      </div>
    `;
  } else {
    body.innerHTML = `
      <div style="font-size: 11px; display: flex; flex-direction: column; gap: 8px;">
        <div>VEHICLE: <strong style="color: var(--color-live);">${shipment.vehiclePlate}</strong></div>
        <div>DRIVER: <strong>${shipment.driver.name} 👤</strong></div>
        <div>SPEED: <strong style="font-family: var(--font-mono);">${shipment.speedKmh} km/h</strong></div>
        <div>ETA: <strong style="color: var(--color-delay); font-family: var(--font-mono);">${shipment.eta}</strong></div>
        <div>LAST VERIFIED: <strong style="color: var(--color-verified);">${shipment.driver.lastVerifiedEvent}</strong></div>
      </div>
    `;
  }
}

function render5DAlerts(shipment) {
  const stream = document.getElementById('alertsStream');
  if (!stream) return;

  stream.innerHTML = shipment.alerts.map(alt => `
    <div class="exception-card severity-${alt.severity}">
      <div class="exception-top">
        <span class="exception-badge badge-${alt.severity}">${alt.what}</span>
        <span class="exception-time">${alt.when}</span>
      </div>
      <div class="exception-what">${alt.what}: ${alt.where}</div>
      <div class="exception-dimensions-grid">
        <div class="dim-row"><span class="dim-label">DURATION:</span><span class="dim-val">${alt.howLong}</span></div>
        <div class="dim-row"><span class="dim-label">WHY:</span><span class="dim-val">${alt.why}</span></div>
        <div class="dim-row"><span class="dim-label">IMPACT:</span><span class="dim-val highlight-${alt.severity}">${alt.impact}</span></div>
      </div>
    </div>
  `).join('');
}

function updateKpiMetrics(shipment) {
  const activeVal = document.getElementById('kpiActiveVal');
  const transitVal = document.getElementById('kpiTransitVal');
  const delayVal = document.getElementById('kpiDelayVal');
  const criticalVal = document.getElementById('kpiCriticalVal');

  if (activeVal) activeVal.innerText = '142';
  if (transitVal) transitVal.innerText = '89';
  if (delayVal) delayVal.innerText = shipment.status === 'amber' || shipment.status === 'red' ? '7' : '6';
  if (criticalVal) criticalVal.innerText = shipment.isDeviated || shipment.quantity.hasMismatch ? '3' : '2';
}

function initTimelineScrubber() {
  const playPauseBtn = document.getElementById('playPauseBtn');
  const timelineSlider = document.getElementById('timelineSlider');
  const speedBtn = document.getElementById('speedBtn');

  playPauseBtn?.addEventListener('click', () => {
    StampChainState.isPlaying = !StampChainState.isPlaying;
    playPauseBtn.innerHTML = StampChainState.isPlaying ? '❚❚' : '▶';
  });

  speedBtn?.addEventListener('click', () => {
    if (StampChainState.playbackSpeed === 1) StampChainState.playbackSpeed = 2;
    else if (StampChainState.playbackSpeed === 2) StampChainState.playbackSpeed = 5;
    else StampChainState.playbackSpeed = 1;
    speedBtn.innerText = `${StampChainState.playbackSpeed}x`;
  });

  timelineSlider?.addEventListener('input', (e) => {
    StampChainState.currentTimeProgress = parseFloat(e.target.value) / 100;
    updateTruckSvgOnly();
    drawMapCanvas();
    updateHudValues();
  });
}

function startLiveTelemetryLoop() {
  let lastTimestamp = performance.now();

  function tick(timestamp) {
    const delta = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    if (StampChainState.isPlaying) {
      const step = (0.003 * StampChainState.playbackSpeed) * delta;
      StampChainState.currentTimeProgress += step;
      if (StampChainState.currentTimeProgress > 1) StampChainState.currentTimeProgress = 0;

      const slider = document.getElementById('timelineSlider');
      if (slider) slider.value = Math.round(StampChainState.currentTimeProgress * 100);

      updateTruckSvgOnly();
      drawMapCanvas();
      updateHudValues();
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function updateHudValues() {
  const kmProgress = Math.round(StampChainState.currentTimeProgress * CORRIDOR_DATA.totalDistanceKm);
  const hudKm = document.getElementById('hudDistanceKm');
  const hudSpeed = document.getElementById('hudLiveSpeed');

  if (hudKm) hudKm.innerText = `${kmProgress} / ${CORRIDOR_DATA.totalDistanceKm} KM`;
  if (hudSpeed) hudSpeed.innerText = `46 KM/H`;
}

function initTabsNavigation() {
  document.querySelectorAll('.inspector-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.inspector-tab-btn').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      StampChainState.activeTab = btn.getAttribute('data-tab');
      renderInspectorPanel();
    });
  });
}

const tooltip = document.getElementById('mapTooltip');

function showTooltip(event, headerHtml, subText) {
  if (!tooltip) return;
  tooltip.innerHTML = `
    <div class="tooltip-header">${headerHtml}</div>
    <div class="tooltip-sub">${subText}</div>
  `;
  tooltip.style.display = 'block';
  updateTooltipPos(event);
}

function updateTooltipPos(event) {
  if (!tooltip) return;
  const viewportRect = document.getElementById('mapViewport')?.getBoundingClientRect();
  if (!viewportRect) return;
  tooltip.style.left = `${event.clientX - viewportRect.left}px`;
  tooltip.style.top = `${event.clientY - viewportRect.top}px`;
}

function hideTooltip() {
  if (!tooltip) return;
  tooltip.style.display = 'none';
}

function initEventHandlers() {
  document.getElementById('fleetSelect')?.addEventListener('change', (e) => loadShipment(e.target.value));
  document.getElementById('shipmentsSearchInput')?.addEventListener('input', (e) => {
    StampChainState.searchFilter = e.target.value;
    renderShipmentsPage();
  });
}

function copySharePreviewLink() {
  let shareUrl = window.location.href.split('?')[0];
  shareUrl += `?shipment=${StampChainState.activeShipmentId}&tab=${StampChainState.activeTab}`;
  navigator.clipboard.writeText(shareUrl).then(() => {
    const toast = document.getElementById('shareToast');
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    }
  });
}

function truncate(str, maxLen) {
  return str.length > maxLen ? str.slice(0, maxLen - 2) + '..' : str;
}
