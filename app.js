/**
 * SAVQonnect Web Intro - Application JavaScript
 * Version: 1.0
 * 
 * This file renders all content from truth_pack.json
 * NO hardcoded claims - everything comes from the JSON source
 */

// ============================================
// Truth Pack Loader
// ============================================
const TruthPack = {
  data: null,
  
  async load() {
    // Try fetch first (works with local server)
    try {
      const response = await fetch('./truth_pack.json');
      if (response.ok) {
        this.data = await response.json();
        console.log('✅ Loaded truth_pack.json via fetch');
        return this.data;
      }
    } catch (e) {
      console.log('ℹ️ Fetch failed (CORS), using embedded data');
    }
    
    // Fallback: use embedded data for file:// protocol
    if (typeof TRUTH_PACK_DATA !== 'undefined') {
      this.data = TRUTH_PACK_DATA;
      console.log('✅ Loaded embedded truth pack data');
      return this.data;
    }
    
    // Last resort: show instructions
    document.body.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100vh; 
                  font-family: system-ui; color: #f8fafc; text-align: center; padding: 2rem; background: #0a0f1a;">
        <div>
          <h1 style="font-size: 2rem; margin-bottom: 1rem; color: #3b82f6;">SAVQonnect Web Intro</h1>
          <p style="color: #94a3b8; margin-bottom: 2rem;">Pour voir la présentation, utilisez un serveur local :</p>
          <div style="background: #1e293b; padding: 1.5rem; border-radius: 8px; text-align: left; max-width: 400px; margin: 0 auto;">
            <code style="color: #10b981; display: block; margin-bottom: 0.5rem;">cd demo_web_intro_v1</code>
            <code style="color: #10b981; display: block; margin-bottom: 1rem;">python -m http.server 8000</code>
            <p style="color: #64748b; font-size: 0.875rem; margin: 0;">Puis ouvrez <a href="http://localhost:8000" style="color: #60a5fa;">http://localhost:8000</a></p>
          </div>
        </div>
      </div>
    `;
    throw new Error('No data source available');
  }
};

// ============================================
// Embedded Truth Pack Data (for offline/file:// access)
// ============================================
const TRUTH_PACK_DATA = {
  "meta": {
    "project_name": "SAVQonnect",
    "full_name": "SAVQonnect - Plateforme de Monitoring Audiovisuel",
    "version_tag": "6.1-BETA",
    "repo_url": "https://github.com/Zine76/savqonnect-core",
    "organization": "UQAM - Université du Québec à Montréal",
    "department": "Service de l'audiovisuel",
    "generated_at": "2026-02-02T13:45:00Z",
    "generator": "OpenSpec create-web-intro-v1"
  },
  "elevator_pitch": {
    "sentence": "SAVQonnect est une plateforme de monitoring et de contrôle audiovisuel en temps réel qui unifie la surveillance de 2000+ équipements AV à travers le campus de l'UQAM.",
    "bullets": [
      "Monitoring temps réel de projecteurs, microphones, systèmes audio et réseaux Dante",
      "Contrôle à distance via protocoles natifs (PJLink, SSC, QRC)",
      "Intégration transparente avec les systèmes existants (Podio, LibCal, SRS)"
    ]
  },
  "problem_space": {
    "pain_points": [
      {
        "id": "pain.fragmented",
        "title": "Outils fragmentés",
        "description": "Chaque type d'équipement a son propre outil de monitoring, créant des silos d'information."
      },
      {
        "id": "pain.reactive",
        "title": "Maintenance réactive",
        "description": "Les problèmes sont découverts par les utilisateurs en salle, pas par les techniciens."
      },
      {
        "id": "pain.manual",
        "title": "Interventions manuelles",
        "description": "Chaque diagnostic nécessite un déplacement physique, même pour des vérifications simples."
      }
    ]
  },
  "pillars": [
    {
      "id": "pillar.observability",
      "title": "Observabilité",
      "icon": "eye",
      "summary": "Vue unifiée de tous les équipements AV avec statuts en temps réel et métriques Prometheus."
    },
    {
      "id": "pillar.intelligence",
      "title": "Intelligence",
      "icon": "brain",
      "summary": "Diagnostics automatisés, corrélation d'événements et aide à la décision."
    },
    {
      "id": "pillar.action",
      "title": "Action",
      "icon": "lightning",
      "summary": "Contrôle à distance des équipements et création automatisée de tickets de maintenance."
    }
  ],
  "capabilities": [
    {
      "id": "cap.monitoring.realtime",
      "title": "Monitoring temps réel",
      "pillar": "pillar.observability",
      "summary": "Surveillance continue de tous les équipements avec mise à jour via SSE.",
      "status": "implemented",
      "evidence": [
        {"type": "frontend", "path": "src/views/DashboardView.vue", "anchor": "Device grid"},
        {"type": "store", "path": "src/stores/devicesStore.js", "anchor": "SSE updates"}
      ]
    },
    {
      "id": "cap.monitoring.prometheus",
      "title": "Métriques Prometheus",
      "pillar": "pillar.observability",
      "summary": "Collecte et exposition de métriques pour monitoring et alerting.",
      "status": "implemented",
      "evidence": [
        {"type": "code", "path": "internal/monitoring/metrics.go", "anchor": "MetricsManager"},
        {"type": "route", "path": "main.go", "anchor": "GET /metrics"}
      ]
    },
    {
      "id": "cap.room.cockpit",
      "title": "Cockpit de salle",
      "pillar": "pillar.observability",
      "summary": "Interface Mission Control pour visualiser et contrôler tous les équipements d'une salle.",
      "status": "implemented",
      "evidence": [
        {"type": "frontend", "path": "src/views/SalleView.vue", "anchor": "Room cockpit"},
        {"type": "component", "path": "src/components/salle/SalleCockpit.vue", "anchor": "Cockpit"}
      ]
    },
    {
      "id": "cap.dashboard.widgets",
      "title": "Dashboard personnalisable",
      "pillar": "pillar.observability",
      "summary": "Widgets drag & drop pour créer des vues personnalisées.",
      "status": "implemented",
      "evidence": [
        {"type": "frontend", "path": "src/views/MonitoringView.vue", "anchor": "Widget grid"},
        {"type": "component", "path": "src/components/widgets/BaseWidget.vue", "anchor": "Base widget"}
      ]
    },
    {
      "id": "cap.control.pjlink",
      "title": "Contrôle projecteurs PJLink",
      "pillar": "pillar.action",
      "summary": "Allumage, extinction, changement de source et AV-Mute des projecteurs.",
      "status": "implemented",
      "evidence": [
        {"type": "code", "path": "internal/pjlinkclient/client.go", "anchor": "SetPower, SetInputSource"},
        {"type": "config", "path": "config.env.example", "anchor": "PJLINK_PASSWORD"}
      ]
    },
    {
      "id": "cap.control.sennheiser",
      "title": "Contrôle microphones Sennheiser",
      "pillar": "pillar.action",
      "summary": "Mute/unmute et redémarrage des microphones TCC2, TCCM, TC Bar.",
      "status": "implemented",
      "evidence": [
        {"type": "code", "path": "internal/sennheiser/service.go", "anchor": "SennheiserService"},
        {"type": "handlers", "path": "internal/sennheiser/handlers/", "anchor": "Mute, Restart"}
      ]
    },
    {
      "id": "cap.control.qsys",
      "title": "Monitoring Q-SYS",
      "pillar": "pillar.observability",
      "summary": "Surveillance des cores Q-SYS via protocole QRC.",
      "status": "implemented",
      "evidence": [
        {"type": "code", "path": "internal/qsys/client.go", "anchor": "QRC protocol"},
        {"type": "frontend", "path": "src/views/QsysEnvironment/QsysDashboard.vue", "anchor": "Dashboard"}
      ]
    },
    {
      "id": "cap.control.ddm",
      "title": "Dante Domain Manager",
      "pillar": "pillar.observability",
      "summary": "Monitoring du réseau audio Dante avec visualisation des domaines.",
      "status": "implemented",
      "evidence": [
        {"type": "code", "path": "internal/ddm/client.go", "anchor": "GraphQL client"},
        {"type": "frontend", "path": "src/views/DDMView.vue", "anchor": "DDM dashboard"}
      ]
    },
    {
      "id": "cap.ticketing.podio",
      "title": "Intégration Podio",
      "pillar": "pillar.action",
      "summary": "Création et suivi des bons de travail (BT) via l'API Podio.",
      "status": "implemented",
      "evidence": [
        {"type": "handlers", "path": "podio_handlers.go", "anchor": "Podio API"},
        {"type": "frontend", "path": "src/views/PodioView.vue", "anchor": "Podio chatbot"}
      ]
    },
    {
      "id": "cap.booking.libcal",
      "title": "Intégration LibCal",
      "pillar": "pillar.intelligence",
      "summary": "Consultation des réservations LibCal pour contextualiser les interventions.",
      "status": "implemented",
      "evidence": [
        {"type": "code", "path": "internal/libcal/client.go", "anchor": "OAuth2 client"},
        {"type": "frontend", "path": "src/views/LibCalView.vue", "anchor": "LibCal view"}
      ]
    },
    {
      "id": "cap.booking.srs",
      "title": "Intégration SRS Oracle",
      "pillar": "pillar.intelligence",
      "summary": "Consultation du Système de Réservation de Salles UQAM.",
      "status": "implemented",
      "evidence": [
        {"type": "code", "path": "internal/srs/client.go", "anchor": "Oracle DB client"},
        {"type": "frontend", "path": "src/views/SRSView.vue", "anchor": "SRS calendar"}
      ]
    },
    {
      "id": "cap.network.meraki",
      "title": "Monitoring Cisco Meraki",
      "pillar": "pillar.observability",
      "summary": "Surveillance des équipements réseau Meraki.",
      "status": "implemented",
      "evidence": [
        {"type": "code", "path": "internal/meraki/client.go", "anchor": "Dashboard API"},
        {"type": "frontend", "path": "src/views/MerakiView.vue", "anchor": "Meraki view"}
      ]
    },
    {
      "id": "cap.auth.rbac",
      "title": "Contrôle d'accès RBAC",
      "pillar": "pillar.intelligence",
      "summary": "Gestion des rôles avec permissions granulaires.",
      "status": "implemented",
      "evidence": [
        {"type": "store", "path": "src/stores/auth.js", "anchor": "Role management"},
        {"type": "code", "path": "rbac_permissions.go", "anchor": "RBAC system"}
      ]
    },
    {
      "id": "cap.auth.oidc",
      "title": "SSO Keycloak/Azure",
      "pillar": "pillar.intelligence",
      "summary": "Authentification unique via Keycloak avec support Azure AD.",
      "status": "implemented",
      "evidence": [
        {"type": "code", "path": "internal/oidc/client.go", "anchor": "OIDCClient"},
        {"type": "config", "path": "config.env.example", "anchor": "OIDC_* vars"}
      ]
    },
    {
      "id": "cap.diagnostic.roombrain",
      "title": "Room Brain - Diagnostic IA",
      "pillar": "pillar.intelligence",
      "summary": "Analyse automatisée de l'état des salles avec détection de patterns.",
      "status": "implemented",
      "evidence": [
        {"type": "code", "path": "internal/roombrain/brain.go", "anchor": "Brain engine"},
        {"type": "component", "path": "src/components/salle/RoomBrainPanel.vue", "anchor": "Brain UI"}
      ]
    }
  ],
  "integrations": [
    {
      "id": "int.pjlink",
      "name": "PJLink",
      "category": "Équipements",
      "purpose": "Protocole standard pour contrôle de projecteurs",
      "protocol": "TCP",
      "port": 4352,
      "status": "implemented",
      "devices": ["Panasonic", "Epson", "NEC", "Christie"],
      "evidence": [
        {"type": "code", "path": "internal/pjlinkclient/client.go", "anchor": "GetPowerStatus"},
        {"type": "config", "path": "config.env.example", "anchor": "PJLINK_PASSWORD"}
      ]
    },
    {
      "id": "int.sennheiser.sscv1",
      "name": "Sennheiser SSCv1",
      "category": "Équipements",
      "purpose": "Protocole de contrôle pour microphones TCC2",
      "protocol": "TCP",
      "port": 45,
      "status": "implemented",
      "devices": ["TeamConnect Ceiling 2 (TCC2)"],
      "evidence": [
        {"type": "code", "path": "internal/sennheiserclient/", "anchor": "SSCv1 client"},
        {"type": "component", "path": "src/components/device_details/sennheiser/TCC2Details.vue", "anchor": "TCC2 UI"}
      ]
    },
    {
      "id": "int.sennheiser.sscv2",
      "name": "Sennheiser SSCv2",
      "category": "Équipements",
      "purpose": "Protocole HTTPS pour TCCM, TC Bar et SpeechLine",
      "protocol": "HTTPS",
      "port": 443,
      "status": "implemented",
      "devices": ["TCCM", "TC Bar", "SpeechLine"],
      "evidence": [
        {"type": "code", "path": "internal/sennheiser/sscv2/", "anchor": "SSCv2 client"},
        {"type": "handlers", "path": "internal/sennheiser/handlers/tcbar_handlers.go", "anchor": "TC Bar"}
      ]
    },
    {
      "id": "int.qsys",
      "name": "Q-SYS QRC",
      "category": "Équipements",
      "purpose": "Protocole de contrôle Q-SYS pour cores audio",
      "protocol": "TCP",
      "port": 1710,
      "status": "implemented",
      "devices": ["Q-SYS Core 110f", "Core 510i"],
      "evidence": [
        {"type": "code", "path": "internal/qsys/client.go", "anchor": "QRC protocol"},
        {"type": "frontend", "path": "src/views/QsysEnvironment/QsysDashboard.vue", "anchor": "Dashboard"}
      ]
    },
    {
      "id": "int.ddm",
      "name": "Dante Domain Manager",
      "category": "Réseau",
      "purpose": "Gestion centralisée du réseau audio Dante",
      "protocol": "HTTPS/GraphQL",
      "port": 443,
      "status": "implemented",
      "evidence": [
        {"type": "code", "path": "internal/ddm/client.go", "anchor": "GraphQL client"},
        {"type": "frontend", "path": "src/views/DDMView.vue", "anchor": "DDM dashboard"}
      ]
    },
    {
      "id": "int.mersive",
      "name": "Mersive Solstice",
      "category": "Équipements",
      "purpose": "Contrôle des pods de présentation sans fil",
      "protocol": "HTTPS/REST",
      "port": 443,
      "status": "implemented",
      "evidence": [
        {"type": "code", "path": "internal/mersiveclient/", "anchor": "Mersive client"},
        {"type": "component", "path": "src/components/salle/SalleMersiveControl.vue", "anchor": "Control"}
      ]
    },
    {
      "id": "int.crestron",
      "name": "Crestron SSH",
      "category": "Équipements",
      "purpose": "Contrôle des processeurs Crestron via SSH",
      "protocol": "SSH",
      "port": 22,
      "status": "implemented",
      "evidence": [
        {"type": "code", "path": "internal/sshcontrol/", "anchor": "SSH control"},
        {"type": "component", "path": "src/components/salle/SalleCrestronControl.vue", "anchor": "Control"}
      ]
    },
    {
      "id": "int.podio",
      "name": "Podio",
      "category": "Services",
      "purpose": "Gestion des bons de travail (BT)",
      "protocol": "HTTPS/REST",
      "port": 443,
      "status": "implemented",
      "evidence": [
        {"type": "handlers", "path": "podio_handlers.go", "anchor": "Podio API"},
        {"type": "config", "path": "config.env.example", "anchor": "PODIO_* vars"}
      ]
    },
    {
      "id": "int.libcal",
      "name": "LibCal (Springshare)",
      "category": "Services",
      "purpose": "Intégration réservation de salles",
      "protocol": "HTTPS/REST",
      "port": 443,
      "status": "implemented",
      "evidence": [
        {"type": "code", "path": "internal/libcal/client.go", "anchor": "OAuth2 client"},
        {"type": "config", "path": "config.env.example", "anchor": "LIBCAL_* vars"}
      ]
    },
    {
      "id": "int.srs",
      "name": "SRS (UQAM)",
      "category": "Services",
      "purpose": "Système de Réservation de Salles Oracle",
      "protocol": "Oracle DB",
      "port": 1521,
      "status": "implemented",
      "evidence": [
        {"type": "code", "path": "internal/srs/client.go", "anchor": "Oracle client"},
        {"type": "config", "path": "config.env.example", "anchor": "SRS_ORACLE_* vars"}
      ]
    },
    {
      "id": "int.meraki",
      "name": "Cisco Meraki",
      "category": "Réseau",
      "purpose": "Monitoring équipements réseau",
      "protocol": "HTTPS/REST",
      "port": 443,
      "status": "implemented",
      "evidence": [
        {"type": "code", "path": "internal/meraki/client.go", "anchor": "Dashboard API"},
        {"type": "config", "path": "config.env.example", "anchor": "MERAKI_API_KEY"}
      ]
    },
    {
      "id": "int.prometheus",
      "name": "Prometheus",
      "category": "Infrastructure",
      "purpose": "Collecte et stockage de métriques",
      "protocol": "HTTP",
      "port": 9091,
      "status": "implemented",
      "evidence": [
        {"type": "code", "path": "internal/monitoring/metrics.go", "anchor": "MetricsManager"},
        {"type": "route", "path": "main.go", "anchor": "/metrics endpoint"}
      ]
    },
    {
      "id": "int.redis",
      "name": "Redis",
      "category": "Infrastructure",
      "purpose": "Cache et sessions",
      "protocol": "Redis",
      "port": 6379,
      "status": "implemented",
      "evidence": [
        {"type": "docker", "path": "docker-compose.production.yml", "anchor": "Redis service"},
        {"type": "config", "path": "config.env.example", "anchor": "REDIS_ADDR"}
      ]
    },
    {
      "id": "int.keycloak",
      "name": "Keycloak OIDC",
      "category": "Sécurité",
      "purpose": "Authentification SSO via OpenID Connect",
      "protocol": "HTTPS/OIDC",
      "port": 443,
      "status": "implemented",
      "evidence": [
        {"type": "code", "path": "internal/oidc/client.go", "anchor": "OIDCClient"},
        {"type": "config", "path": "config.env.example", "anchor": "OIDC_* vars"}
      ]
    },
    {
      "id": "int.neondb",
      "name": "NeonDB",
      "category": "Infrastructure",
      "purpose": "Base de données PostgreSQL serverless",
      "protocol": "PostgreSQL",
      "port": 5432,
      "status": "implemented",
      "evidence": [
        {"type": "code", "path": "internal/db/postgres_executor.go", "anchor": "PostgreSQL executor"},
        {"type": "config", "path": "config.env.example", "anchor": "DATABASE_URL"}
      ]
    },
    {
      "id": "int.deepfreeze",
      "name": "DeepFreeze",
      "category": "Services",
      "purpose": "Gestion des postes PC",
      "protocol": "REST",
      "port": 443,
      "status": "implemented",
      "evidence": [
        {"type": "frontend", "path": "src/views/DeepFreezeView.vue", "anchor": "DeepFreeze view"},
        {"type": "store", "path": "src/stores/deepfreeze.js", "anchor": "DeepFreeze store"}
      ]
    }
  ],
  "architecture": {
    "diagram_type": "flow",
    "description": "Architecture distribuée avec backend Go, frontend Vue, et multiples intégrations.",
    "layers": [
      {"name": "Équipements AV", "components": ["Projecteurs (PJLink)", "Microphones (SSC)", "Audio (Q-SYS)", "Réseau (Dante)"]},
      {"name": "Backend Go", "components": ["API REST", "Protocoles natifs", "Cache Redis", "Métriques Prometheus"]},
      {"name": "Frontend Vue", "components": ["Dashboard", "Cockpit Salle", "Widgets", "Admin"]},
      {"name": "Services externes", "components": ["Podio (tickets)", "LibCal/SRS (réservations)", "Keycloak (auth)"]}
    ],
    "data_flows": [
      {"from": "Équipements AV", "to": "Backend Go", "protocol": "PJLink/SSC/QRC/REST", "description": "Polling et contrôle"},
      {"from": "Backend Go", "to": "Prometheus", "protocol": "HTTP", "description": "Export métriques"},
      {"from": "Backend Go", "to": "Redis", "protocol": "Redis", "description": "Cache et sessions"},
      {"from": "Backend Go", "to": "NeonDB", "protocol": "PostgreSQL", "description": "Persistance"},
      {"from": "Frontend Vue", "to": "Backend Go", "protocol": "REST/SSE", "description": "API et temps réel"},
      {"from": "Backend Go", "to": "Podio", "protocol": "REST", "description": "Tickets BT"},
      {"from": "Backend Go", "to": "LibCal/SRS", "protocol": "REST/Oracle", "description": "Réservations"}
    ]
  },
  "demo_story": {
    "title": "Du signal à l'action",
    "subtitle": "Comment SAVQonnect transforme un incident en solution",
    "steps": [
      {
        "id": "step.detect",
        "phase": "Détecter",
        "icon": "eye",
        "title": "Anomalie détectée",
        "description": "Le monitoring temps réel détecte qu'un microphone TCC2 en salle A-1825 ne répond plus.",
        "evidence": [
          {"type": "frontend", "path": "src/views/DashboardView.vue", "anchor": "Real-time grid"}
        ]
      },
      {
        "id": "step.diagnose",
        "phase": "Diagnostiquer",
        "icon": "brain",
        "title": "Contexte enrichi",
        "description": "Room Brain analyse: aucune réservation active (SRS), dernière intervention il y a 3 mois (Podio), pattern similaire dans 2 autres salles.",
        "evidence": [
          {"type": "code", "path": "internal/roombrain/brain.go", "anchor": "Brain analysis"}
        ]
      },
      {
        "id": "step.act",
        "phase": "Agir",
        "icon": "lightning",
        "title": "Résolution ou escalade",
        "description": "Le technicien tente un redémarrage à distance via SSC. Si échec, un BT est créé automatiquement dans Podio avec tout le contexte.",
        "evidence": [
          {"type": "handlers", "path": "internal/sennheiser/handlers/", "anchor": "Restart handler"}
        ]
      }
    ]
  },
  "stats": {
    "devices_monitored": "2000+",
    "protocols_supported": 8,
    "integrations_active": 16,
    "buildings_covered": "Tous les pavillons UQAM",
    "response_time": "< 5 secondes",
    "uptime_target": "99.9%"
  },
  "future": [
    {
      "id": "future.copilot.advanced",
      "title": "Copilot IA avancé",
      "description": "Assistant conversationnel avec RAG pour diagnostics complexes.",
      "status": "in_progress",
      "timeline": "Q1 2026"
    },
    {
      "id": "future.predictive",
      "title": "Maintenance prédictive",
      "description": "Prédiction des pannes basée sur l'historique.",
      "status": "planned",
      "timeline": "Q3 2026"
    },
    {
      "id": "future.mobile",
      "title": "Application mobile",
      "description": "Application native iOS/Android pour les techniciens terrain.",
      "status": "planned",
      "timeline": "2027"
    }
  ],
  "terminology": {
    "room_format": "PAV-ROOM (ex: A-1825, DS-2505)",
    "pavilion_codes": ["A", "C", "DS", "J", "PK", "SH", "SB", "N", "V", "R", "D", "K"],
    "bt": "Bon de Travail (ticket de maintenance)"
  }
};

// ============================================
// SVG Icons (inline to avoid external dependencies)
// ============================================
const Icons = {
  eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>`,
  
  brain: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.54"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.54"/>
  </svg>`,
  
  lightning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>`,
  
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>`,
  
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>`,
  
  server: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
    <line x1="6" y1="6" x2="6.01" y2="6"/>
    <line x1="6" y1="18" x2="6.01" y2="18"/>
  </svg>`,
  
  network: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="9" y="2" width="6" height="6"/>
    <rect x="16" y="16" width="6" height="6"/>
    <rect x="2" y="16" width="6" height="6"/>
    <path d="M5 16v-4h14v4"/>
    <line x1="12" y1="12" x2="12" y2="8"/>
  </svg>`,
  
  projector: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="7" width="20" height="10" rx="2"/>
    <circle cx="17" cy="12" r="2"/>
    <line x1="6" y1="12" x2="10" y2="12"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
  </svg>`,
  
  microphone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
  </svg>`,
  
  speaker: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
    <circle cx="12" cy="14" r="4"/>
    <line x1="12" y1="6" x2="12.01" y2="6"/>
  </svg>`,
  
  ticket: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
    <path d="M13 5v2"/>
    <path d="M13 17v2"/>
    <path d="M13 11v2"/>
  </svg>`,
  
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>`,
  
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>`,
  
  database: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>`,
  
  activity: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>`,
  
  alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>`,
  
  wifi: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
    <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
    <line x1="12" y1="20" x2="12.01" y2="20"/>
  </svg>`,
  
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>`,
  
  monitor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>`,
  
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>`
};

// Map icon names to SVG
const getIcon = (name) => {
  return Icons[name] || Icons.server;
};

// Get icon based on integration category
const getIntegrationIcon = (integration) => {
  const categoryIcons = {
    'Équipements': 'projector',
    'Réseau': 'network',
    'Services': 'ticket',
    'Infrastructure': 'server',
    'Sécurité': 'shield'
  };
  
  const nameIcons = {
    'pjlink': 'projector',
    'sennheiser': 'microphone',
    'qsys': 'speaker',
    'ddm': 'network',
    'podio': 'ticket',
    'libcal': 'calendar',
    'srs': 'calendar',
    'meraki': 'wifi',
    'prometheus': 'activity',
    'redis': 'database',
    'keycloak': 'shield',
    'neondb': 'database',
    'deepfreeze': 'monitor',
    'mersive': 'monitor',
    'crestron': 'server'
  };
  
  // Try to match by ID
  for (const [key, icon] of Object.entries(nameIcons)) {
    if (integration.id.toLowerCase().includes(key)) {
      return getIcon(icon);
    }
  }
  
  // Fall back to category
  return getIcon(categoryIcons[integration.category] || 'server');
};

// ============================================
// Renderers
// ============================================
const Renderer = {
  // Hero section
  hero(data) {
    // Pitch
    const pitchEl = document.getElementById('hero-pitch');
    if (pitchEl && data.elevator_pitch) {
      pitchEl.textContent = data.elevator_pitch.sentence;
    }
    
    // Bullets
    const bulletsEl = document.getElementById('hero-bullets');
    if (bulletsEl && data.elevator_pitch?.bullets) {
      bulletsEl.innerHTML = data.elevator_pitch.bullets.map(bullet => `
        <div class="hero-bullet">
          <svg class="hero-bullet-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>${bullet}</span>
        </div>
      `).join('');
    }
    
    // Stats
    const statsEl = document.getElementById('hero-stats');
    if (statsEl && data.stats) {
      statsEl.innerHTML = `
        <div class="hero-stat">
          <div class="hero-stat-value">${data.stats.devices_monitored}</div>
          <div class="hero-stat-label">Équipements</div>
        </div>
        <div class="hero-stat">
          <div class="hero-stat-value">${data.stats.integrations_active}</div>
          <div class="hero-stat-label">Intégrations</div>
        </div>
        <div class="hero-stat">
          <div class="hero-stat-value">${data.stats.protocols_supported}</div>
          <div class="hero-stat-label">Protocoles</div>
        </div>
      `;
    }
    
    // Version tag
    const versionEl = document.getElementById('version-tag');
    if (versionEl && data.meta) {
      versionEl.textContent = data.meta.version_tag;
    }
  },
  
  // Problem space
  painPoints(data) {
    const container = document.getElementById('pain-points');
    if (!container || !data.problem_space?.pain_points) return;
    
    container.innerHTML = data.problem_space.pain_points.map(pain => `
      <div class="pain-card">
        <svg class="pain-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <h3 class="pain-title">${pain.title}</h3>
        <p class="pain-description">${pain.description}</p>
      </div>
    `).join('');
  },
  
  // Pillars section
  pillars(data) {
    const container = document.getElementById('pillars-grid');
    if (!container || !data.pillars) return;
    
    container.innerHTML = data.pillars.map(pillar => `
      <div class="pillar-card">
        <div class="pillar-icon">
          ${getIcon(pillar.icon)}
        </div>
        <h3 class="pillar-title">${pillar.title}</h3>
        <p class="pillar-summary">${pillar.summary}</p>
      </div>
    `).join('');
  },
  
  // Capabilities section
  capabilities(data) {
    const container = document.getElementById('capabilities-grid');
    if (!container || !data.capabilities) return;
    
    // Only show implemented capabilities
    const implemented = data.capabilities.filter(c => c.status === 'implemented');
    
    container.innerHTML = implemented.map(cap => {
      const pillar = data.pillars?.find(p => p.id === cap.pillar);
      const pillarName = pillar?.title || '';
      
      return `
        <div class="capability-card" data-capability-id="${cap.id}">
          <div class="capability-header">
            <div class="capability-icon">
              ${getIcon(pillar?.icon || 'server')}
            </div>
            <div>
              <div class="capability-title">${cap.title}</div>
              <div class="capability-pillar">${pillarName}</div>
            </div>
          </div>
          <p class="capability-summary">${cap.summary}</p>
          <div class="capability-status">
            <svg class="capability-status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Implémenté
          </div>
        </div>
      `;
    }).join('');
  },
  
  // Integrations section
  integrations(data) {
    const filtersContainer = document.getElementById('integrations-filters');
    const gridContainer = document.getElementById('integrations-grid');
    if (!gridContainer || !data.integrations) return;
    
    // Get unique categories
    const categories = ['Tous', ...new Set(data.integrations.map(i => i.category))];
    
    // Render filters
    if (filtersContainer) {
      filtersContainer.innerHTML = categories.map((cat, index) => `
        <button class="filter-btn ${index === 0 ? 'active' : ''}" data-category="${cat}">
          ${cat}
        </button>
      `).join('');
      
      // Add filter event listeners
      filtersContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          // Update active state
          filtersContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          
          // Filter integrations
          const category = btn.dataset.category;
          gridContainer.querySelectorAll('.integration-card').forEach(card => {
            if (category === 'Tous' || card.dataset.category === category) {
              card.style.display = '';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }
    
    // Render integrations
    gridContainer.innerHTML = data.integrations.map(int => `
      <div class="integration-card" data-integration-id="${int.id}" data-category="${int.category}">
        <div class="integration-header">
          <div class="integration-icon">
            ${getIntegrationIcon(int)}
          </div>
          <div>
            <div class="integration-name">${int.name}</div>
            <span class="integration-category">${int.category}</span>
          </div>
        </div>
        <p class="integration-purpose">${int.purpose}</p>
        <div class="integration-meta">
          ${int.protocol ? `<span>🔌 ${int.protocol}</span>` : ''}
          ${int.port ? `<span>📡 Port ${int.port}</span>` : ''}
        </div>
      </div>
    `).join('');
    
    // Add click handlers for modal
    gridContainer.querySelectorAll('.integration-card').forEach(card => {
      card.addEventListener('click', () => {
        const integrationId = card.dataset.integrationId;
        const integration = data.integrations.find(i => i.id === integrationId);
        if (integration) {
          Modal.show(integration);
        }
      });
    });
  },
  
  // Architecture section
  architecture(data) {
    const container = document.getElementById('architecture-diagram');
    if (!container || !data.architecture) return;
    
    const arch = data.architecture;
    
    container.innerHTML = `
      <div class="architecture-layers">
        ${arch.layers?.map(layer => `
          <div class="architecture-layer">
            <div class="layer-label">${layer.name}</div>
            <div class="layer-components">
              ${layer.components.map(comp => `
                <div class="layer-component">${comp}</div>
              `).join('')}
            </div>
          </div>
        `).join('') || ''}
      </div>
      
      ${arch.data_flows ? `
        <div class="architecture-flows">
          <h4 class="flows-title">Flux de données</h4>
          <div class="flows-list">
            ${arch.data_flows.map(flow => `
              <div class="flow-item">
                <span>${flow.from}</span>
                <span class="flow-arrow">→</span>
                <span>${flow.to}</span>
                <span class="flow-protocol">${flow.protocol}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;
  },
  
  // Demo story section
  demoStory(data) {
    const titleEl = document.getElementById('demo-title');
    const subtitleEl = document.getElementById('demo-subtitle');
    const container = document.getElementById('demo-timeline');
    
    if (!data.demo_story) return;
    
    if (titleEl) {
      titleEl.textContent = data.demo_story.title;
    }
    
    if (subtitleEl) {
      subtitleEl.textContent = data.demo_story.subtitle || '';
    }
    
    if (container) {
      container.innerHTML = data.demo_story.steps.map(step => `
        <div class="demo-step">
          <div class="demo-step-icon">
            ${getIcon(step.icon)}
          </div>
          <div class="demo-step-content">
            <span class="demo-step-phase">${step.phase}</span>
            <h4 class="demo-step-title">${step.title}</h4>
            <p class="demo-step-description">${step.description}</p>
          </div>
        </div>
      `).join('');
    }
  },
  
  // Reality check section
  realityCheck(data) {
    const implementedList = document.getElementById('implemented-list');
    const futureList = document.getElementById('future-list');
    
    // Implemented capabilities (top 8)
    if (implementedList && data.capabilities) {
      const implemented = data.capabilities
        .filter(c => c.status === 'implemented')
        .slice(0, 8);
      
      implementedList.innerHTML = implemented.map(cap => `
        <div class="reality-item">
          <svg class="reality-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <div class="reality-item-content">
            <div class="reality-item-title">${cap.title}</div>
            <div class="reality-item-description">${cap.summary}</div>
          </div>
        </div>
      `).join('');
    }
    
    // Future items
    if (futureList && data.future) {
      futureList.innerHTML = data.future.map(item => `
        <div class="reality-item">
          <svg class="reality-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          <div class="reality-item-content">
            <div class="reality-item-title">${item.title}</div>
            <div class="reality-item-description">${item.description || ''}</div>
            ${item.timeline ? `<div class="reality-item-timeline">📅 ${item.timeline}</div>` : ''}
          </div>
        </div>
      `).join('');
    }
  },
  
  // Footer
  footer(data) {
    const generatedAtEl = document.getElementById('generated-at');
    const repoLinkEl = document.getElementById('repo-link');
    
    if (generatedAtEl && data.meta?.generated_at) {
      const date = new Date(data.meta.generated_at);
      generatedAtEl.textContent = date.toLocaleDateString('fr-CA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    
    if (repoLinkEl && data.meta?.repo_url) {
      repoLinkEl.href = data.meta.repo_url;
      repoLinkEl.textContent = 'GitHub Repository';
    }
  }
};

// ============================================
// Modal Controller
// ============================================
const Modal = {
  element: null,
  
  init() {
    this.element = document.getElementById('modal');
    if (!this.element) return;
    
    // Close on backdrop click
    this.element.querySelector('.modal-backdrop')?.addEventListener('click', () => this.hide());
    
    // Close on button click
    this.element.querySelector('.modal-close')?.addEventListener('click', () => this.hide());
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.element.classList.contains('visible')) {
        this.hide();
      }
    });
  },
  
  show(integration) {
    if (!this.element) return;
    
    // Populate modal content
    const iconEl = document.getElementById('modal-icon');
    const titleEl = document.getElementById('modal-title');
    const categoryEl = document.getElementById('modal-category');
    const purposeEl = document.getElementById('modal-purpose');
    const detailsEl = document.getElementById('modal-details');
    const evidenceEl = document.getElementById('modal-evidence');
    
    if (iconEl) {
      iconEl.innerHTML = getIntegrationIcon(integration);
    }
    
    if (titleEl) {
      titleEl.textContent = integration.name;
    }
    
    if (categoryEl) {
      categoryEl.textContent = integration.category;
    }
    
    if (purposeEl) {
      purposeEl.textContent = integration.purpose;
    }
    
    if (detailsEl) {
      detailsEl.innerHTML = `
        ${integration.protocol ? `
          <div class="modal-detail">
            <div class="modal-detail-label">Protocole</div>
            <div class="modal-detail-value">${integration.protocol}</div>
          </div>
        ` : ''}
        ${integration.port ? `
          <div class="modal-detail">
            <div class="modal-detail-label">Port</div>
            <div class="modal-detail-value">${integration.port}</div>
          </div>
        ` : ''}
        ${integration.devices ? `
          <div class="modal-detail" style="grid-column: span 2;">
            <div class="modal-detail-label">Appareils supportés</div>
            <div class="modal-detail-value">${integration.devices.join(', ')}</div>
          </div>
        ` : ''}
      `;
    }
    
    if (evidenceEl && integration.evidence) {
      evidenceEl.innerHTML = integration.evidence.map(ev => `
        <div class="evidence-item">
          <span class="evidence-type">${ev.type}</span>
          <span class="evidence-path">${ev.path}${ev.anchor ? ` → ${ev.anchor}` : ''}</span>
        </div>
      `).join('');
    }
    
    // Show modal
    this.element.classList.remove('hidden');
    requestAnimationFrame(() => {
      this.element.classList.add('visible');
    });
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  },
  
  hide() {
    if (!this.element) return;
    
    this.element.classList.remove('visible');
    
    setTimeout(() => {
      this.element.classList.add('hidden');
    }, 300);
    
    // Restore body scroll
    document.body.style.overflow = '';
  }
};

// ============================================
// Scroll Observer
// ============================================
const ScrollObserver = {
  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate demo steps sequentially
            if (entry.target.id === 'demo-story') {
              const steps = entry.target.querySelectorAll('.demo-step');
              steps.forEach((step, index) => {
                setTimeout(() => {
                  step.classList.add('visible');
                }, index * 200);
              });
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-50px'
      }
    );
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
      observer.observe(section);
    });
  }
};

// ============================================
// Navigation
// ============================================
const Navigation = {
  init() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    
    // Scroll behavior for nav background
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        nav.style.background = 'rgba(15, 23, 42, 0.95)';
      } else {
        nav.style.background = 'rgba(15, 23, 42, 0.8)';
      }
      
      lastScroll = currentScroll;
    });
    
    // Smooth scroll for nav links
    nav.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
};

// ============================================
// Initialize Application
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Load truth pack
    const data = await TruthPack.load();
    
    // Render all sections
    Renderer.hero(data);
    Renderer.painPoints(data);
    Renderer.pillars(data);
    Renderer.capabilities(data);
    Renderer.integrations(data);
    Renderer.architecture(data);
    Renderer.demoStory(data);
    Renderer.realityCheck(data);
    Renderer.footer(data);
    
    // Initialize components
    Modal.init();
    ScrollObserver.init();
    Navigation.init();
    
    // Make first sections visible immediately
    document.getElementById('amalgame')?.classList.add('visible');
    document.getElementById('hero')?.classList.add('visible');
    
    console.log('✅ SAVQonnect Web Intro loaded successfully');
    console.log(`📊 Data source: truth_pack.json (generated: ${data.meta?.generated_at})`);
    
  } catch (error) {
    console.error('Failed to initialize application:', error);
  }
});
