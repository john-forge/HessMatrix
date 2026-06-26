// NJSLS schema 1.1 overlay — augments window.NJSLS_STANDARDS with NGSS three-
// dimensional fields (sep_practices, dci_codes, ccc_concepts, seps, dcis, cccs)
// for the 75 science Performance Expectations, and sets the top-level
// window.NJSLS_SCIENCE_DIMENSIONS enumeration.
//
// Source: rtusiime.github.io/njsls (data/all.json) — schema_version "1.1"
// pasted verbatim by John on 2026-06-24. Non-science records are unchanged
// from v1.0; this file does not touch them.
//
// Load AFTER njsls_standards.js. Safe to be missing — the page works with v1.0.

(function () {
  if (typeof window === "undefined") return;

  window.NJSLS_SCHEMA_VERSION = "1.1";

  window.NJSLS_SCIENCE_DIMENSIONS = {
    note: "NGSS three-dimensionality tagged on science PEs. Filter records by these lenses via their sep_practices / dci_codes / ccc_concepts keys.",
    sep_practices: [
      "Analyzing and Interpreting Data",
      "Asking Questions and Defining Problems",
      "Constructing Explanations and Designing Solutions",
      "Developing and Using Models",
      "Engaging in Argument from Evidence",
      "Obtaining, Evaluating, and Communicating Information",
      "Planning and Carrying Out Investigations",
      "Using Mathematics and Computational Thinking"
    ],
    ccc_concepts: [
      "Cause and Effect",
      "Connections to Engineering, Technology, and Applications of Science",
      "Connections to Nature of Science",
      "Energy and Matter",
      "Influence of Engineering, Technology, and Science on Society and the Natural World",
      "Interdependence of Science, Engineering, and Technology",
      "Patterns",
      "Scale, Proportion, and Quantity",
      "Science Addresses Questions About the Natural and Material World",
      "Science is a Human Endeavor",
      "Scientific Knowledge Assumes an Order and Consistency in Natural Systems",
      "Scientific Knowledge is Based on Empirical Evidence",
      "Stability and Change",
      "Structure and Function",
      "Systems and System Models"
    ],
    dci_codes: [
      "ESS1.A","ESS1.B","ESS1.C","ESS2.A","ESS2.B","ESS2.C","ESS2.D",
      "ESS3.A","ESS3.B","ESS3.C","ESS3.D",
      "ETS1.A","ETS1.B","ETS1.C",
      "LS1.A","LS1.B","LS1.C","LS1.D","LS2.A","LS2.B","LS3.A","LS3.B",
      "LS4.A","LS4.B","LS4.C",
      "PS1.A","PS1.B","PS2.A","PS2.B","PS3.A","PS3.B","PS3.C","PS4.A","PS4.B","PS4.C"
    ]
  };

  // Per-PE NGSS three-dimensional fields. Each entry adds the new schema-1.1
  // fields to the existing v1.0 standard record on overlay-apply.
  var AUG = {
    "5-PS1-1": {
      sep_practices: ["Developing and Using Models"],
      dci_codes: ["PS1.A"],
      seps: [{ practice: "Developing and Using Models", bullets: ["Develop a model to describe phenomena."] }],
      dcis: [{ code: "PS1.A", name: "Structure and Properties of Matter", bullets: ["Matter of any type can be subdivided into particles that are too small to see, but even then the matter still exists and can be detected by other means. A model showing that gases are made from matter particles that are too small to see and are moving freely around in space can explain many observations, including the inflation and shape of a balloon and the effects of air on larger particles or objects."] }]
    },
    "5-PS1-2": {
      sep_practices: ["Using Mathematics and Computational Thinking"],
      dci_codes: ["PS1.A", "PS1.B"],
      ccc_concepts: ["Scale, Proportion, and Quantity"],
      seps: [{ practice: "Using Mathematics and Computational Thinking", bullets: ["Measure and graph quantities such as weight to address scientific and engineering questions and problems."] }],
      dcis: [
        { code: "PS1.A", name: "Structure and Properties of Matter", bullets: ["The amount (weight) of matter is conserved when it changes form, even in transitions in which it seems to vanish.", "Measurements of a variety of properties can be used to identify"] },
        { code: "PS1.B", name: "Chemical Reactions", bullets: ["No matter what reaction or change in properties occurs, the total weight of the substances does not and change. (Boundary: Mass and weight are not distinguished at this grade level.)"] }
      ],
      cccs: [{ concept: "Scale, Proportion, and Quantity", bullets: ["Standard units are used to measure and describe physical quantities such as weight, time, temperature, and volume."] }]
    },
    "5-PS1-3": {
      sep_practices: ["Planning and Carrying Out Investigations"],
      dci_codes: ["PS1.A"],
      ccc_concepts: ["Scale, Proportion, and Quantity"],
      seps: [{ practice: "Planning and Carrying Out Investigations", bullets: ["Make observations and measurements to produce data to serve as the basis for evidence for an explanation of a phenomenon."] }],
      dcis: [{ code: "PS1.A", name: "Structure and Properties of Matter", bullets: ["materials. (Boundary: At this grade level, mass and weight are not distinguished, and no attempt is made to define the unseen particles or explain the atomic-scale mechanism of evaporation and condensation.)"] }],
      cccs: [{ concept: "Scale, Proportion, and Quantity", bullets: ["Standard units are used to measure and describe physical quantities such as weight, time, temperature, and volume."] }]
    },
    "5-PS1-4": {
      sep_practices: ["Planning and Carrying Out Investigations"],
      dci_codes: ["PS1.B"],
      ccc_concepts: ["Cause and Effect"],
      seps: [{ practice: "Planning and Carrying Out Investigations", bullets: ["serve as the basis for evidence, using fair tests in which variables are controlled and the number of trials considered."] }],
      dcis: [{ code: "PS1.B", name: "Chemical Reactions", bullets: ["When two or more different substances are mixed, a new substance with different properties may be formed."] }],
      cccs: [{ concept: "Cause and Effect", bullets: ["Cause and effect relationships are routinely identified, tested, and used to explain change."] }]
    },
    "5-PS2-1": {
      sep_practices: ["Engaging in Argument from Evidence"],
      dci_codes: ["PS2.B"],
      ccc_concepts: ["Cause and Effect"],
      seps: [{ practice: "Engaging in Argument from Evidence", bullets: ["Support an argument with evidence, data, or a model."] }],
      dcis: [{ code: "PS2.B", name: "Types of Interactions", bullets: ["The gravitational force of Earth acting on an object near Earth’s and surface pulls that object toward the planet’s center.  by"] }],
      cccs: [{ concept: "Cause and Effect", bullets: ["Cause and effect relationships are routinely identified and used to explain change."] }]
    },
    "5-PS3-1": {
      sep_practices: ["Developing and Using Models"],
      ccc_concepts: ["Energy and Matter"],
      seps: [{ practice: "Developing and Using Models", bullets: ["Use models to describe phenomena."] }],
      cccs: [{ concept: "Energy and Matter", bullets: ["Energy can be transferred in various ways and between objects."] }]
    },
    "MS-PS1-1": {
      sep_practices: ["Developing and Using Models"],
      dci_codes: ["PS1.A"],
      ccc_concepts: ["Scale, Proportion, and Quantity"],
      seps: [{ practice: "Developing and Using Models", bullets: ["Develop a model to predict and/or describe phenomena."] }],
      dcis: [{ code: "PS1.A", name: "Structure and Properties of Matter", bullets: [
        "Substances are made from different types of atoms, which combine with one another in various ways. Atoms form molecules that range in size from two to thousands of atoms.",
        "Solids may be formed from molecules, or they may be extended structures with repeating subunits (e.g., crystals).  and",
        "The changes of state that occur with variations in temperature or pressure can be described and predicted using these models of matter."
      ] }],
      cccs: [{ concept: "Scale, Proportion, and Quantity", bullets: ["Time, space, and energy phenomena can be observed at various scales using models to study systems that are too large or too small."] }]
    },
    "MS-PS1-2": {
      sep_practices: ["Analyzing and Interpreting Data"],
      dci_codes: ["PS1.A", "PS1.B"],
      ccc_concepts: ["Patterns", "Connections to Nature of Science"],
      seps: [{ practice: "Analyzing and Interpreting Data", bullets: ["Analyze and interpret data to determine similarities and differences in findings."] }],
      dcis: [
        { code: "PS1.A", name: "Structure and Properties of Matter", bullets: ["Each pure substance has characteristic physical and chemical properties (for any bulk quantity under given conditions) that can be used to identify it."] },
        { code: "PS1.B", name: "Chemical Reactions", bullets: ["Substances react chemically in characteristic ways. In a chemical process, the atoms that make up the original substances are regrouped into different molecules, and these new substances have different properties from those of the reactants. ,"] }
      ],
      cccs: [
        { concept: "Patterns", bullets: ["Macroscopic patterns are related to the nature of microscopic and atomic-level structure."] },
        { concept: "Connections to Nature of Science", bullets: ["Science knowledge is based upon logical and conceptual connections between evidence and explanations. Science Models, Laws, Mechanisms, and Theories Explain Natural Phenomena"] }
      ]
    },
    "MS-PS1-3": {
      sep_practices: ["Obtaining, Evaluating, and Communicating Information"],
      dci_codes: ["PS1.A", "PS1.B"],
      ccc_concepts: ["Structure and Function", "Connections to Engineering, Technology, and Applications of Science"],
      seps: [{ practice: "Obtaining, Evaluating, and Communicating Information", bullets: ["Gather, read, and synthesize information from multiple appropriate sources and assess the credibility, accuracy, and possible bias of each publication and methods used, and describe how they are supported or not supported by evidence."] }],
      dcis: [
        { code: "PS1.A", name: "Structure and Properties of Matter", bullets: ["Each pure substance has characteristic physical and chemical properties (for any bulk quantity under given conditions) that can be used to identify it."] },
        { code: "PS1.B", name: "Chemical Reactions", bullets: ["Substances react chemically in characteristic ways. In a chemical process, the atoms that make up the original substances are regrouped into different molecules, and these new substances have different properties from those of the reactants. ,"] }
      ],
      cccs: [
        { concept: "Structure and Function", bullets: ["Structures can be designed to serve particular functions by taking into account properties of different materials, and how materials can be shaped and used."] },
        { concept: "Connections to Engineering, Technology, and Applications of Science", bullets: [
          "Engineering advances have led to important discoveries in virtually every field of science, and scientific discoveries have led to the development of entire industries and engineered systems. Influence of Science, Engineering and Technology on Society and the Natural World",
          "The uses of technologies and any limitations on their use are driven by individual or societal needs, desires, and values; by the findings of scientific research; and by differences in such factors as climate, natural resources, and economic conditions. Thus, technology use varies from region to region and over time."
        ] }
      ]
    },
    "MS-PS1-4": {
      sep_practices: ["Developing and Using Models"],
      dci_codes: ["PS1.A"],
      ccc_concepts: ["Cause and Effect"],
      seps: [{ practice: "Developing and Using Models", bullets: ["Develop a model to predict and/or describe phenomena."] }],
      dcis: [{ code: "PS1.A", name: "Structure and Properties of Matter", bullets: [
        "Gases and liquids are made of molecules or inert atoms that are moving about relative to each other.",
        "In a liquid, the molecules are constantly in contact with others; in a gas, they are widely spaced except when they happen to collide. In a solid, atoms are closely spaced and may vibrate in position but do not change relative locations.",
        "Solids may be formed from molecules, or they may be extended structures with repeating subunits (e.g., crystals).  and",
        "The changes of state that occur with variations in temperature or pressure can be described and predicted using these models of matter."
      ] }],
      cccs: [{ concept: "Cause and Effect", bullets: ["Cause and effect relationships may be used to predict phenomena in natural or designed systems."] }]
    },
    "MS-PS1-5": {
      sep_practices: ["Developing and Using Models"],
      dci_codes: ["PS1.B"],
      ccc_concepts: ["Energy and Matter", "Connections to Nature of Science"],
      seps: [{ practice: "Developing and Using Models", bullets: ["Develop a model to describe unobservable mechanisms."] }],
      dcis: [{ code: "PS1.B", name: "Chemical Reactions", bullets: [
        "Substances react chemically in characteristic ways. In a chemical process, the atoms that make up the original substances are regrouped into different molecules, and these new substances have different properties from those of the reactants. ,",
        "The total number of each type of atom is conserved, and thus the mass does not change."
      ] }],
      cccs: [
        { concept: "Energy and Matter", bullets: ["Matter is conserved because atoms are conserved in physical and chemical processes."] },
        { concept: "Connections to Nature of Science", bullets: ["Laws are regularities or mathematical descriptions of natural phenomena."] }
      ]
    },
    "MS-PS1-6": {
      sep_practices: ["Constructing Explanations and Designing Solutions"],
      dci_codes: ["PS1.B"],
      ccc_concepts: ["Energy and Matter"],
      seps: [{ practice: "Constructing Explanations and Designing Solutions", bullets: ["Undertake a design project, engaging in the design cycle, to construct and/or implement a solution that meets specific design criteria and constraints."] }],
      dcis: [{ code: "PS1.B", name: "Chemical Reactions", bullets: ["Some chemical reactions release energy, others store energy."] }],
      cccs: [{ concept: "Energy and Matter", bullets: ["The transfer of energy can be tracked as energy flows through a designed or natural system."] }]
    },
    "MS-PS2-1": {
      sep_practices: ["Asking Questions and Defining Problems"],
      dci_codes: ["PS2.A"],
      ccc_concepts: ["Systems and System Models"],
      seps: [{ practice: "Asking Questions and Defining Problems", bullets: [
        "or system. Engaging in Argument from Evidence Engaging in argument from evidence in 6–8 builds from grades K–5 experiences and progresses to constructing a convincing argument that supports or refutes claims for either explanations or solutions about the natural and designed world.",
        "Construct and present oral and written arguments supported by empirical evidence and scientific reasoning to support or refute an explanation or a model for a"
      ] }],
      dcis: [{ code: "PS2.A", name: "Forces and Motion", bullets: [
        "but in the opposite direction (Newton’s third law).",
        "The motion of an object is determined by the sum of the forces acting on it; if the total force on the object is not zero, its motion will change. The greater the mass of the object, the greater the force needed to achieve the same change in motion. For any given object, a larger force causes a larger change"
      ] }],
      cccs: [{ concept: "Systems and System Models", bullets: ["outputs—and energy and matter flows within systems."] }]
    },
    "MS-PS2-2": {
      dci_codes: ["PS2.A"],
      ccc_concepts: ["Stability and Change", "Scientific Knowledge is Based on Empirical Evidence"],
      dcis: [{ code: "PS2.A", name: "Forces and Motion", bullets: [
        "in motion.",
        "All positions of objects and the directions of forces and motions must be described in an arbitrarily chosen reference frame and arbitrarily chosen units of size. In order to share information with",
        "other people, these choices must also be shared."
      ] }],
      cccs: [
        { concept: "Stability and Change", bullets: [] },
        { concept: "Scientific Knowledge is Based on Empirical Evidence", bullets: ["between evidence and explanations."] }
      ]
    },
    "MS-PS2-3": {
      sep_practices: ["Asking Questions and Defining Problems"],
      dci_codes: ["PS2.B"],
      ccc_concepts: ["Cause and Effect"],
      seps: [{ practice: "Asking Questions and Defining Problems", bullets: [
        "based on observations and scientific principles. Constructing Explanations and Designing Solutions Constructing explanations and designing solutions in 6–8 builds from grades K–5 experiences and progresses to include constructing explanations and designing solutions supported by multiple sources of evidence consistent with scientific ideas, principles, and theories.",
        "Apply scientific ideas or principles to design an object, tool, process"
      ] }],
      dcis: [{ code: "PS2.B", name: "Types of Interactions", bullets: [
        "distances between the interacting objects.",
        "Gravitational forces are always attractive. There is a gravitational force between any two masses, but it is very small except when one or both of the objects have large mass—e.g., Earth and the sun."
      ] }],
      cccs: [{ concept: "Cause and Effect", bullets: [] }]
    },
    "MS-PS2-4": {
      sep_practices: ["Asking Questions and Defining Problems"],
      dci_codes: ["PS2.B"],
      ccc_concepts: ["Systems and System Models", "Scientific Knowledge is Based on Empirical Evidence"],
      seps: [{ practice: "Asking Questions and Defining Problems", bullets: ["phenomenon or a solution to a problem."] }],
      dcis: [{ code: "PS2.B", name: "Types of Interactions", bullets: ["Forces that act at a distance (electric, magnetic, and gravitational) can be explained by fields that extend through space and can be mapped by their effect on a test object (a charged object, or a ball, respectively)."] }],
      cccs: [
        { concept: "Systems and System Models", bullets: [] },
        { concept: "Scientific Knowledge is Based on Empirical Evidence", bullets: [] }
      ]
    },
    "MS-PS2-5": {
      dci_codes: ["PS2.B"],
      ccc_concepts: ["Cause and Effect"],
      dcis: [{ code: "PS2.B", name: "Types of Interactions", bullets: [] }],
      cccs: [{ concept: "Cause and Effect", bullets: [] }]
    },
    "MS-PS3-1": {
      sep_practices: ["Analyzing and Interpreting Data"],
      dci_codes: ["PS3.A"],
      ccc_concepts: ["Scale, Proportion, and Quantity"],
      seps: [{ practice: "Analyzing and Interpreting Data", bullets: ["Construct and interpret graphical displays of data to identify linear and nonlinear relationships."] }],
      dcis: [{ code: "PS3.A", name: "Definitions of Energy", bullets: ["Motion energy is properly called kinetic energy; it is proportional to the mass of the moving object and grows with the square of its speed."] }],
      cccs: [{ concept: "Scale, Proportion, and Quantity", bullets: ["Proportional relationships (e.g. speed as the ratio of distance traveled to time taken) among different types of quantities provide information about the magnitude of properties and processes."] }]
    },
    "MS-PS3-2": {
      sep_practices: ["Developing and Using Models"],
      dci_codes: ["PS3.A", "PS3.C"],
      ccc_concepts: ["Systems and System Models"],
      seps: [{ practice: "Developing and Using Models", bullets: ["Develop a model to describe unobservable mechanisms. Planning and Carrying Out Investigations Planning and carrying out investigations to answer questions or test solutions to problems in 6–8 builds on K–5 experiences and progresses to include investigations that use multiple variables and provide evidence to support explanations or design solutions."] }],
      dcis: [
        { code: "PS3.A", name: "Definitions of Energy", bullets: ["A system of objects may also contain stored (potential) energy, depending on their relative positions."] },
        { code: "PS3.C", name: "Relationship Between Energy and Forces", bullets: ["When two objects interact, each one exerts a force on the other that can cause energy to be transferred to or from the object."] }
      ],
      cccs: [{ concept: "Systems and System Models", bullets: ["Models can be used to represent systems and their interactions – such as inputs, processes, and outputs – and energy and matter flows within systems."] }]
    },
    "MS-PS3-3": {
      sep_practices: ["Constructing Explanations and Designing Solutions"],
      dci_codes: ["PS3.A", "PS3.B"],
      ccc_concepts: ["Energy and Matter"],
      seps: [{ practice: "Constructing Explanations and Designing Solutions", bullets: ["Apply scientific ideas or principles to design, construct, and test a design of an object, tool, process or system."] }],
      dcis: [
        { code: "PS3.A", name: "Definitions of Energy", bullets: ["Temperature is a measure of the average kinetic energy of particles of matter. The relationship between the temperature and the total energy of a system depends on the types, states, and amounts of matter present."] },
        { code: "PS3.B", name: "Conservation of Energy and Energy Transfer", bullets: ["Energy is spontaneously transferred out of hotter regions or objects and into colder ones."] }
      ],
      cccs: [{ concept: "Energy and Matter", bullets: ["The transfer of energy can be tracked as energy flows through a designed or natural system."] }]
    },
    "MS-PS3-4": {
      sep_practices: ["Developing and Using Models"],
      dci_codes: ["PS3.A", "PS3.B"],
      ccc_concepts: ["Scale, Proportion, and Quantity", "Scientific Knowledge is Based on Empirical Evidence"],
      seps: [{ practice: "Developing and Using Models", bullets: ["Plan an investigation individually and collaboratively, and in the design: identify independent and dependent variables and controls, what tools are needed to do the gathering, how measurements will be recorded, and how many data are needed to support a claim."] }],
      dcis: [
        { code: "PS3.A", name: "Definitions of Energy", bullets: ["Temperature is a measure of the average kinetic energy of particles of matter. The relationship between the temperature and the total energy of a system depends on the types, states, and amounts of matter present."] },
        { code: "PS3.B", name: "Conservation of Energy and Energy Transfer", bullets: ["The amount of energy transfer needed to change the temperature of a matter sample by a given amount depends on the nature of the matter, the size of the sample, and the environment."] }
      ],
      cccs: [
        { concept: "Scale, Proportion, and Quantity", bullets: ["Proportional relationships (e.g. speed as the ratio of distance traveled to time taken) among different types of quantities provide information about the magnitude of properties and processes."] },
        { concept: "Scientific Knowledge is Based on Empirical Evidence", bullets: ["Science knowledge is based upon logical and conceptual connections between evidence and explanations"] }
      ]
    },
    "MS-PS3-5": {
      sep_practices: ["Engaging in Argument from Evidence"],
      dci_codes: ["PS3.B"],
      ccc_concepts: ["Energy and Matter", "Scientific Knowledge is Based on Empirical Evidence"],
      seps: [{ practice: "Engaging in Argument from Evidence", bullets: ["Construct, use, and present oral and written arguments supported by empirical evidence and scientific reasoning to support or refute an explanation or a model for a phenomenon."] }],
      dcis: [{ code: "PS3.B", name: "Conservation of Energy and Energy Transfer", bullets: ["When the motion energy of an object changes, there is inevitably some other change in energy at the same time."] }],
      cccs: [
        { concept: "Energy and Matter", bullets: ["Energy may take different forms (e.g. energy in fields, thermal energy, energy of motion)."] },
        { concept: "Scientific Knowledge is Based on Empirical Evidence", bullets: ["Science knowledge is based upon logical and conceptual connections between evidence and explanations"] }
      ]
    },
    "MS-PS4-1": {
      sep_practices: ["Developing and Using Models"],
      dci_codes: ["PS4.A"],
      ccc_concepts: ["Patterns"],
      seps: [{ practice: "Developing and Using Models", bullets: ["Use mathematical representations to describe and/or support scientific"] }],
      dcis: [{ code: "PS4.A", name: "Wave Properties", bullets: ["A simple wave has a repeating pattern with a specific wavelength, frequency, and amplitude."] }],
      cccs: [{ concept: "Patterns", bullets: ["Graphs and charts can be used to identify patterns in data."] }]
    },
    "MS-PS4-2": {
      sep_practices: ["Developing and Using Models"],
      dci_codes: ["PS4.A", "PS4.B"],
      ccc_concepts: ["Structure and Function"],
      seps: [{ practice: "Developing and Using Models", bullets: ["Develop and use a model to describe phenomena. Using Mathematics and Computational Thinking Mathematical and computational thinking at the 6–8 builds on K–5 progresses to identifying patterns in large data sets and using mathematical concepts to support explanations and arguments."] }],
      dcis: [
        { code: "PS4.A", name: "Wave Properties", bullets: ["A sound wave needs a medium through which it is transmitted."] },
        { code: "PS4.B", name: "Electromagnetic Radiation", bullets: [
          "When light shines on an object, it is reflected, absorbed, or transmitted through the object, depending on the object’s material and and the frequency (color) of the light.",
          "The path that light travels can be traced as straight lines, except at surfaces between different transparent materials (e.g., air and water, air and glass) where the light path bends.",
          "A wave model of light is useful for explaining brightness, color, and the frequency-dependent bending",
          "of light at a surface between media.",
          "However, because light can travel through space, it cannot be a matter wave, like sound or water waves."
        ] }
      ],
      cccs: [{ concept: "Structure and Function", bullets: ["Structures can be designed to serve particular functions by taking into account properties of different materials, and how materials can be shaped and used."] }]
    },
    "MS-PS4-3": {
      sep_practices: ["Obtaining, Evaluating, and Communicating Information"],
      dci_codes: ["PS4.C"],
      ccc_concepts: ["Structure and Function"],
      seps: [{ practice: "Obtaining, Evaluating, and Communicating Information", bullets: ["Integrate qualitative scientific and technical information in written text with that contained in media and visual displays to clarify claims and findings."] }],
      dcis: [{ code: "PS4.C", name: "Information Technologies and Instrumentation", bullets: ["Digitized signals (sent as wave pulses) are a more reliable way to encode and transmit information."] }],
      cccs: [{ concept: "Structure and Function", bullets: [
        "Structures can be designed to serve particular functions. Connections to Engineering, Technology, and Applications of Science Influence of Science, Engineering, and Technology on Society and the Natural World",
        "Technologies extend the measurement, exploration, modeling, and computational capacity of scientific investigations."
      ] }]
    },
    "5-LS1-1": {
      sep_practices: ["Engaging in Argument from Evidence"],
      dci_codes: ["LS1.C"],
      ccc_concepts: ["Energy and Matter"],
      seps: [{ practice: "Engaging in Argument from Evidence", bullets: ["Support an argument with evidence, data, or a model."] }],
      dcis: [{ code: "LS1.C", name: "Organization for Matter and Energy Flow in Organisms", bullets: ["Plants acquire their material for and growth chiefly from air and water.  by"] }],
      cccs: [{ concept: "Energy and Matter", bullets: ["Matter is transported into, out of, and within systems."] }]
    },
    "5-LS2-1": {
      sep_practices: ["Developing and Using Models"],
      dci_codes: ["LS2.A", "LS2.B"],
      ccc_concepts: ["Systems and System Models"],
      seps: [{ practice: "Developing and Using Models", bullets: ["Develop a model to describe phenomena."] }],
      dcis: [
        { code: "LS2.A", name: "Interdependent Relationships in Ecosystems", bullets: ["The food of almost any kind of animal can be traced back to plants. Organisms are related in food webs in which some animals eat plants for food and other animals eat the animals that eat plants. Some organisms, such as fungi and bacteria, break down dead organisms (both plants or plants parts and animals) and therefore operate as “decomposers.” Decomposition eventually restores (recycles) some materials back to the soil. Organisms can survive only in environments in which their particular needs are met. A healthy ecosystem is one in which multiple species of different types are each able to meet their needs in a relatively stable web of life. Newly introduced species can damage the balance of an ecosystem."] },
        { code: "LS2.B", name: "Cycles of Matter and Energy Transfer in Ecosystems", bullets: ["Matter cycles between the air and soil and among plants, animals, and microbes as these organisms live and die. Organisms obtain gases, and water, from the environment, and release waste matter (gas, liquid, or solid) back into the environment."] }
      ],
      cccs: [{ concept: "Systems and System Models", bullets: ["A system can be described in terms of its components and their interactions."] }]
    },
    "MS-LS1-1": {
      sep_practices: ["Planning and Carrying Out Investigations"],
      dci_codes: ["LS1.A"],
      ccc_concepts: ["Scale, Proportion, and Quantity", "Interdependence of Science, Engineering, and Technology"],
      seps: [{ practice: "Planning and Carrying Out Investigations", bullets: ["Conduct an investigation to produce data to serve as the basis for evidence that meet the goals an investigation."] }],
      dcis: [{ code: "LS1.A", name: "Structure and Function", bullets: ["All living things are made up of cells, which is the smallest unit that can be said to be alive. An organism may consist of one single cell (unicellular) or many different numbers and types of cells (multicellular)."] }],
      cccs: [
        { concept: "Scale, Proportion, and Quantity", bullets: ["Phenomena that can be observed at one scale may not be observable at another scale."] },
        { concept: "Interdependence of Science, Engineering, and Technology", bullets: ["Engineering advances have led to important discoveries in virtually every field of science, and scientific discoveries have led to the development of entire industries and engineered systems."] }
      ]
    },
    "MS-LS1-2": {
      sep_practices: ["Developing and Using Models"],
      dci_codes: ["LS1.A"],
      ccc_concepts: ["Structure and Function"],
      seps: [{ practice: "Developing and Using Models", bullets: ["Develop and use a model to describe phenomena."] }],
      dcis: [{ code: "LS1.A", name: "Structure and Function", bullets: ["Within cells, special structures are responsible for particular functions, and the cell membrane forms the boundary that controls what enters and leaves the cell."] }],
      cccs: [{ concept: "Structure and Function", bullets: ["depends on the relationships among its parts, therefore complex natural structures/systems can be analyzed to determine how they function. Connections to Engineering, Technology, and Applications of Science"] }]
    },
    "MS-LS1-3": {
      sep_practices: ["Engaging in Argument from Evidence"],
      dci_codes: ["LS1.A"],
      ccc_concepts: ["Systems and System Models", "Science is a Human Endeavor"],
      seps: [{ practice: "Engaging in Argument from Evidence", bullets: ["Use an oral and written argument supported by evidence to support or refute an explanation or a model for a phenomenon."] }],
      dcis: [{ code: "LS1.A", name: "Structure and Function", bullets: ["In multicellular organisms, the body is a system of multiple interacting subsystems. These subsystems are groups of cells that work together to form tissues and organs that are specialized for particular body functions."] }],
      cccs: [
        { concept: "Systems and System Models", bullets: ["Systems may interact with other systems; they may have sub- systems and be a part of larger complex systems."] },
        { concept: "Science is a Human Endeavor", bullets: ["Scientists and engineers are guided by habits of mind such as intellectual honesty, tolerance of ambiguity, skepticism, and openness to new ideas. Scientific Knowledge is Based on Empirical Evidence"] }
      ]
    },
    "MS-LS1-4": {
      sep_practices: ["Engaging in Argument from Evidence"],
      dci_codes: ["LS1.B"],
      ccc_concepts: ["Cause and Effect"],
      seps: [{ practice: "Engaging in Argument from Evidence", bullets: ["Use an oral and written argument supported by empirical evidence and scientific reasoning to support or refute an explanation or a model for a phenomenon or a solution to a problem."] }],
      dcis: [{ code: "LS1.B", name: "Growth and Development of Organisms", bullets: [
        "Animals engage in characteristic of behaviors that increase the odds of reproduction.",
        "Plants reproduce in a variety of ways, sometimes depending on animal behavior and specialized features for reproduction."
      ] }],
      cccs: [{ concept: "Cause and Effect", bullets: ["Phenomena may have more than one cause, and some cause and effect relationships in systems can only be described using probability."] }]
    },
    "MS-LS1-5": {
      sep_practices: ["Constructing Explanations and Designing Solutions"],
      dci_codes: ["LS1.B"],
      ccc_concepts: ["Cause and Effect"],
      seps: [{ practice: "Constructing Explanations and Designing Solutions", bullets: ["Construct a scientific explanation based on valid and reliable evidence obtained from sources (including the students’ own experiments) and the assumption that theories and laws that describe the natural world operate today as they did in the past and will continue to do so in the future."] }],
      dcis: [{ code: "LS1.B", name: "Growth and Development of Organisms", bullets: ["Genetic factors as well as local conditions affect the growth of the adult plant."] }],
      cccs: [{ concept: "Cause and Effect", bullets: ["Phenomena may have more than one cause, and some cause and effect relationships in systems can only be described using probability."] }]
    },
    "MS-LS1-6": {
      sep_practices: ["Constructing Explanations and Designing Solutions"],
      dci_codes: ["LS1.C"],
      ccc_concepts: ["Energy and Matter", "Science is a Human Endeavor"],
      seps: [{ practice: "Constructing Explanations and Designing Solutions", bullets: ["Construct a scientific explanation based on valid and reliable evidence obtained from sources (including the students’ own experiments) and the assumption that theories and laws that describe the natural world operate today as they did in the past and will continue to do so in the future."] }],
      dcis: [{ code: "LS1.C", name: "Organization for Matter", bullets: ["Plants, algae (including phytoplankton), and many microorganisms use the energy from light to make sugars (food) from carbon dioxide from the atmosphere and water through the process of photosynthesis, which also releases oxygen. These sugars can be used immediately or stored for growth or later use."] }],
      cccs: [
        { concept: "Energy and Matter", bullets: ["Within a natural system, the transfer of energy drives the motion and/or cycling of matter."] },
        { concept: "Science is a Human Endeavor", bullets: ["Science knowledge is based upon logical connections between evidence and explanations."] }
      ]
    },
    "MS-LS1-7": {
      sep_practices: ["Developing and Using Models"],
      dci_codes: ["LS1.C"],
      ccc_concepts: ["Energy and Matter"],
      seps: [{ practice: "Developing and Using Models", bullets: ["Develop a model to describe unobservable mechanisms."] }],
      dcis: [{ code: "LS1.C", name: "Organization for Matter", bullets: ["Within individual organisms, food moves through a series of chemical reactions in which it is broken down and rearranged to form new molecules, to support growth, or to or release energy."] }],
      cccs: [{ concept: "Energy and Matter", bullets: ["Matter is conserved because atoms are conserved in physical and chemical processes."] }]
    },
    "MS-LS1-8": {
      sep_practices: ["Obtaining, Evaluating, and Communicating Information"],
      dci_codes: ["LS1.D"],
      ccc_concepts: ["Cause and Effect"],
      seps: [{ practice: "Obtaining, Evaluating, and Communicating Information", bullets: ["Gather, read, and synthesize information from multiple appropriate sources and assess the credibility, accuracy, and possible bias of each publication and methods used, and describe how they are supported or not supported by evidence."] }],
      dcis: [{ code: "LS1.D", name: "Information Processing", bullets: ["Each sense receptor responds to different inputs (electromagnetic, mechanical, chemical), transmitting them as signals that travel along nerve cells to the brain. The signals are then processed in the brain, resulting in immediate behaviors or memories."] }],
      cccs: [{ concept: "Cause and Effect", bullets: ["Cause and effect relationships may be used to predict phenomena in natural systems."] }]
    },
    "MS-LS2-1": {
      sep_practices: ["Analyzing and Interpreting Data"],
      dci_codes: ["LS2.A"],
      ccc_concepts: ["Cause and Effect"],
      seps: [{ practice: "Analyzing and Interpreting Data", bullets: ["Analyze and interpret data to provide evidence for phenomena. Constructing Explanations and Designing Solutions Constructing explanations and designing solutions in 6–8 builds on K–5 experiences and progresses to include constructing explanations designing solutions supported by multiple sources of evidence consistent with scientific ideas, principles, and theories."] }],
      dcis: [{ code: "LS2.A", name: "Interdependent Relationships in Ecosystems", bullets: [
        "Organisms, and populations of organisms, are dependent on their environmental interactions both with other living things and with nonliving factors.",
        "In any ecosystem, organisms and populations with similar requirements for food, water, oxygen, or other resources may compete with each other for limited resources, access to which consequently constrains their growth and reproduction.",
        "Growth of organisms and population increases are limited by access to resources."
      ] }],
      cccs: [{ concept: "Cause and Effect", bullets: ["Cause and effect relationships may be used to predict phenomena in natural or designed systems."] }]
    },
    "MS-LS2-2": {
      sep_practices: ["Analyzing and Interpreting Data"],
      dci_codes: ["LS2.A"],
      ccc_concepts: ["Patterns"],
      seps: [{ practice: "Analyzing and Interpreting Data", bullets: ["Construct an explanation that includes qualitative or quantitative relationships between variables that predict phenomena. Engaging in Argument from Evidence Engaging in argument from evidence in 6–8 builds on K–5 experiences progresses to constructing a convincing argument that supports refutes claims for either explanations or solutions about the natural and designed world(s)."] }],
      dcis: [{ code: "LS2.A", name: "Interdependent Relationships in Ecosystems", bullets: ["Similarly, predatory interactions may reduce the number of organisms or eliminate whole populations of organisms. Mutually beneficial interactions, in contrast, may become so interdependent that each organism requires the other for survival. Although the species involved in these competitive, predatory, and mutually beneficial interactions and vary across ecosystems, the patterns of interactions of organisms with their environments, both living and nonliving, are shared."] }],
      cccs: [{ concept: "Patterns", bullets: ["Patterns can be used to identify cause and effect relationships."] }]
    },
    "MS-LS2-3": {
      sep_practices: ["Developing and Using Models"],
      dci_codes: ["LS2.B"],
      ccc_concepts: ["Energy and Matter", "Connections to Nature of Science"],
      seps: [{ practice: "Developing and Using Models", bullets: ["Develop a model to describe phenomena."] }],
      dcis: [{ code: "LS2.B", name: "Cycle of Matter and Energy", bullets: ["Food webs are models that demonstrate how matter and energy is transferred between producers, consumers, and decomposers as the three groups interact within an ecosystem. Transfers of matter into and out of and the physical environment occur at every level. Decomposers recycle or nutrients from dead plant or animal matter back to the soil in terrestrial environments or to the water in aquatic environments. The atoms that make up the organisms in an ecosystem are cycled repeatedly between the living and nonliving parts of the ecosystem.  a LS2.C: Ecosystem Dynamics Functioning, and Resilience"] }],
      cccs: [
        { concept: "Energy and Matter", bullets: ["The transfer of energy can be tracked as energy flows through a natural system."] },
        { concept: "Connections to Nature of Science", bullets: ["Science assumes that objects and events in natural systems occur in consistent patterns that are understandable through measurement and observation."] }
      ]
    },
    "MS-LS2-4": {
      sep_practices: ["Analyzing and Interpreting Data"],
      dci_codes: ["LS2.B"],
      ccc_concepts: ["Stability and Change", "Scientific Knowledge is Based on Empirical Evidence"],
      seps: [{ practice: "Analyzing and Interpreting Data", bullets: ["Construct an oral and written argument supported by empirical evidence and scientific reasoning to support or refute an explanation or a model for a phenomenon or solution to a problem."] }],
      dcis: [{ code: "LS2.B", name: "Cycle of Matter and Energy", bullets: [
        "Ecosystems are dynamic in nature; their characteristics can vary over time. Disruptions to any physical or biological component of an ecosystem can lead to shifts in all its populations.",
        "Biodiversity describes the variety of species found in Earth’s terrestrial and oceanic ecosystems."
      ] }],
      cccs: [
        { concept: "Stability and Change", bullets: ["Small changes in one part of a system might cause large changes in another part. Connections to Engineering, Technology, and Applications of Science Influence of Science, Engineering, and Technology on Society and the Natural World"] },
        { concept: "Scientific Knowledge is Based on Empirical Evidence", bullets: ["Science disciplines share common rules of obtaining and evaluating empirical evidence."] }
      ]
    },
    "MS-LS2-5": {
      sep_practices: ["Analyzing and Interpreting Data"],
      dci_codes: ["LS2.B"],
      ccc_concepts: ["Stability and Change", "Science Addresses Questions About the Natural and Material World"],
      seps: [{ practice: "Analyzing and Interpreting Data", bullets: ["Evaluate competing design solutions based on jointly developed and agreed-upon design criteria."] }],
      dcis: [{ code: "LS2.B", name: "Cycle of Matter and Energy", bullets: ["The completeness or integrity of an ecosystem’s biodiversity is often used as a measure of its health."] }],
      cccs: [
        { concept: "Stability and Change", bullets: [
          "Small changes in one part of a system might cause large changes in another part. Connections to Engineering, Technology, and Applications of Science Influence of Science, Engineering, and Technology on Society and the Natural World",
          "The use of technologies and any limitations on their use are driven by individual or societal needs, desires, and values; by the findings of scientific research; and by differences in such factors as climate, natural resources, and economic conditions. Thus, technology use varies from region to region and over time."
        ] },
        { concept: "Science Addresses Questions About the Natural and Material World", bullets: ["Scientific knowledge can describe the consequences of actions but does not necessarily prescribe the decisions that society takes."] }
      ]
    },
    "MS-LS3-1": {
      sep_practices: ["Developing and Using Models"],
      dci_codes: ["LS3.A", "LS3.B"],
      ccc_concepts: ["Structure and Function"],
      seps: [{ practice: "Developing and Using Models", bullets: ["Develop and use a model to describe phenomena."] }],
      dcis: [
        { code: "LS3.A", name: "Inheritance of Traits", bullets: [
          "change traits.",
          "Variations of inherited traits between parent and offspring arise from genetic differences that result from the subset of chromosomes (and therefore genes) inherited."
        ] },
        { code: "LS3.B", name: "Variation of Traits", bullets: [] }
      ],
      cccs: [{ concept: "Structure and Function", bullets: ["function."] }]
    },
    "MS-LS3-2": {
      sep_practices: ["Developing and Using Models"],
      dci_codes: ["LS3.A", "LS3.B"],
      ccc_concepts: ["Cause and Effect"],
      seps: [{ practice: "Developing and Using Models", bullets: [] }],
      dcis: [
        { code: "LS3.A", name: "Inheritance of Traits", bullets: [] },
        { code: "LS3.B", name: "Variation of Traits", bullets: [
          "from each other.",
          "In addition to variations that arise from sexual reproduction, genetic information can be altered because of mutations. Though rare, mutations may result in changes to the structure and function of proteins. Some changes are beneficial, others harmful, and some neutral to the organism."
        ] }
      ],
      cccs: [{ concept: "Cause and Effect", bullets: ["natural systems."] }]
    },
    "MS-LS4-1": {
      sep_practices: ["Analyzing and Interpreting Data"],
      dci_codes: ["LS4.A"],
      ccc_concepts: ["Patterns", "Scientific Knowledge is Based on Empirical Evidence"],
      seps: [{ practice: "Analyzing and Interpreting Data", bullets: ["Analyze and interpret data to determine similarities and differences in findings."] }],
      dcis: [{ code: "LS4.A", name: "Evidence of Common Ancestry and Diversity", bullets: ["The collection of fossils and their placement in chronological order (e.g., through the location of the sedimentary layers in which they are found or through radioactive dating) is known as the fossil record. It documents the existence, diversity, extinction, and change of many life forms throughout the history of life on Earth."] }],
      cccs: [
        { concept: "Patterns", bullets: ["Graphs, charts, and images can be used to identify patterns in data."] },
        { concept: "Scientific Knowledge is Based on Empirical Evidence", bullets: [
          "Science knowledge is based upon logical and conceptual connections between evidence and explanations. Scientific Knowledge Assumes an Order and Consistency in Natural Systems",
          "Science assumes that objects and events in natural systems occur in consistent patterns that are understandable through measurement and observation. Science Addresses Questions About the Natural and Material World"
        ] }
      ]
    },
    "MS-LS4-2": {
      sep_practices: ["Using Mathematics and Computational Thinking"],
      dci_codes: ["LS4.A"],
      ccc_concepts: ["Patterns", "Scientific Knowledge is Based on Empirical Evidence"],
      seps: [{ practice: "Using Mathematics and Computational Thinking", bullets: [
        "Apply scientific ideas to construct an explanation for real-world phenomena, examples, or events.",
        "Construct an explanation that includes qualitative or quantitative relationships between variables"
      ] }],
      dcis: [{ code: "LS4.A", name: "Evidence of Common Ancestry and Diversity", bullets: ["Anatomical similarities and differences between various organisms living today and between them and organisms in the fossil record, enable the reconstruction of evolutionary history and the inference of lines of evolutionary descent."] }],
      cccs: [
        { concept: "Patterns", bullets: ["Patterns can be used to identify cause and effect relationships."] },
        { concept: "Scientific Knowledge is Based on Empirical Evidence", bullets: ["Science assumes that objects and events in natural systems occur in consistent patterns that are understandable through measurement and observation. Science Addresses Questions About the Natural and Material World"] }
      ]
    },
    "MS-LS4-3": {
      sep_practices: ["Analyzing and Interpreting Data"],
      dci_codes: ["LS4.A"],
      ccc_concepts: ["Patterns"],
      seps: [{ practice: "Analyzing and Interpreting Data", bullets: ["Analyze displays of data to identify linear and nonlinear relationships."] }],
      dcis: [{ code: "LS4.A", name: "Evidence of Common Ancestry and Diversity", bullets: ["Comparison of the embryological development of different species also reveals similarities that show relationships not evident in the fully-formed anatomy."] }],
      cccs: [{ concept: "Patterns", bullets: ["Graphs, charts, and images can be used to identify patterns in data."] }]
    },
    "MS-LS4-4": {
      sep_practices: ["Using Mathematics and Computational Thinking"],
      dci_codes: ["LS4.B"],
      ccc_concepts: ["Cause and Effect"],
      seps: [{ practice: "Using Mathematics and Computational Thinking", bullets: ["that describe phenomena. Obtaining, Evaluating, and Communicating Information Obtaining, evaluating, and communicating information in 6–8 builds on K–5 experiences and progresses to evaluating the merit and validity of ideas and methods."] }],
      dcis: [{ code: "LS4.B", name: "Natural Selection", bullets: ["Natural selection leads to the predominance of certain traits in a population, and the suppression of others."] }],
      cccs: [{ concept: "Cause and Effect", bullets: ["Phenomena may have more than one cause, and some cause and effect relationships in systems can only be described using probability. , Connections to Engineering, Technology, and Applications of Science Interdependence of Science, Engineering, and Technology"] }]
    },
    "MS-LS4-5": {
      sep_practices: ["Using Mathematics and Computational Thinking"],
      dci_codes: ["LS4.B"],
      ccc_concepts: ["Cause and Effect", "Scientific Knowledge is Based on Empirical Evidence"],
      seps: [{ practice: "Using Mathematics and Computational Thinking", bullets: ["Gather, read, and synthesize information from multiple appropriate sources and assess the credibility, accuracy, and possible bias of each publication and methods used, and describe how they are supported or not supported by evidence."] }],
      dcis: [{ code: "LS4.B", name: "Natural Selection", bullets: ["In artificial selection, humans have the capacity to influence certain characteristics of organisms by selective breeding. One can choose desired parental traits determined by genes, which are then passed on to offspring."] }],
      cccs: [
        { concept: "Cause and Effect", bullets: [
          "Phenomena may have more than one cause, and some cause and effect relationships in systems can only be described using probability. , Connections to Engineering, Technology, and Applications of Science Interdependence of Science, Engineering, and Technology",
          "Engineering advances have led to important discoveries in virtually every field of science, and scientific discoveries have led to the development of entire industries and engineered systems."
        ] },
        { concept: "Scientific Knowledge is Based on Empirical Evidence", bullets: ["Scientific knowledge can describe the consequences of actions but does not necessarily prescribe the decisions that society takes."] }
      ]
    },
    "MS-LS4-6": {
      sep_practices: ["Using Mathematics and Computational Thinking"],
      dci_codes: ["LS4.C"],
      ccc_concepts: ["Cause and Effect"],
      seps: [{ practice: "Using Mathematics and Computational Thinking", bullets: ["Use mathematical representations to support scientific conclusions and design solutions. Constructing Explanations and Designing Solutions Constructing explanations and designing solutions in 6–8 builds on K–5 experiences and progresses to include constructing explanations and designing solutions supported by multiple sources of evidence consistent with scientific ideas, principles, and theories."] }],
      dcis: [{ code: "LS4.C", name: "Adaptation", bullets: ["environment become more common; those that do not become less common. Thus, the distribution of traits in a population changes."] }],
      cccs: [{ concept: "Cause and Effect", bullets: ["Phenomena may have more than one cause, and some cause and effect relationships in systems can only be described using probability. , Connections to Engineering, Technology, and Applications of Science Interdependence of Science, Engineering, and Technology"] }]
    },
    "5-ESS1-1": {
      dci_codes: ["ESS1.A"],
      dcis: [{ code: "ESS1.A", name: "The Universe and its Stars", bullets: ["The sun is a star that appears larger and brighter than other stars because it is closer. Stars range greatly in their distance from Earth."] }]
    },
    "5-ESS1-2": {
      ccc_concepts: ["Patterns"],
      cccs: [{ concept: "Patterns", bullets: ["Similarities and differences in patterns can be used to sort, classify, communicate and analyze simple rates of change for natural phenomena."] }]
    },
    "5-ESS2-1": {
      sep_practices: ["Developing and Using Models"],
      dci_codes: ["ESS2.A"],
      ccc_concepts: ["Systems and System Models"],
      seps: [{ practice: "Developing and Using Models", bullets: ["Develop a model using an example to describe a scientific principle."] }],
      dcis: [{ code: "ESS2.A", name: "Earth Materials and Systems", bullets: ["Earth’s major systems are the geosphere (solid and molten rock, soil, and sediments), the hydrosphere (water and ice), the atmosphere (air), and the biosphere (living things, including humans). These systems interact in multiple ways to affect Earth’s surface materials and processes. The ocean supports a variety of ecosystems and organisms, shapes landforms, and influences climate. Winds and clouds in the atmosphere interact with the landforms to determine patterns of weather."] }],
      cccs: [{ concept: "Systems and System Models", bullets: ["A system can be described in terms of its components and their interactions."] }]
    },
    "5-ESS2-2": {
      sep_practices: ["Using Mathematics and Computational Thinking"],
      dci_codes: ["ESS2.C"],
      seps: [{ practice: "Using Mathematics and Computational Thinking", bullets: ["Describe and graph quantities such as area and volume to address scientific questions."] }],
      dcis: [{ code: "ESS2.C", name: "The Roles of Water in Earth’s Surface Processes", bullets: ["Nearly all of Earth’s available water is in the ocean. Most fresh water is in glaciers or underground; only a tiny fraction is in streams, lakes, wetlands, and the atmosphere."] }]
    },
    "5-ESS3-1": {
      dci_codes: ["ESS3.C"],
      ccc_concepts: ["Systems and System Models", "Connections to Nature of Science"],
      dcis: [{ code: "ESS3.C", name: "Human Impacts on Earth Systems", bullets: ["Human activities in agriculture, industry, and everyday life have had major effects on the land, and vegetation, streams, ocean, air, and even outer space. But individuals and communities are doing things to help protect Earth’s resources and environments."] }],
      cccs: [
        { concept: "Systems and System Models", bullets: ["A system can be described in terms of its components and their interactions."] },
        { concept: "Connections to Nature of Science", bullets: ["Science findings are limited to questions that can be answered with empirical evidence."] }
      ]
    },
    "MS-ESS1-1": {
      sep_practices: ["Developing and Using Models"],
      dci_codes: ["ESS1.A", "ESS1.B"],
      ccc_concepts: ["Patterns", "Scientific Knowledge Assumes an Order and Consistency in Natural Systems"],
      seps: [{ practice: "Developing and Using Models", bullets: ["Develop and use a model to describe phenomena."] }],
      dcis: [
        { code: "ESS1.A", name: "The Universe and Its Stars", bullets: ["Patterns of the apparent motion of the sun, the moon, and stars in the sky can be observed, described, predicted, and explained with models."] },
        { code: "ESS1.B", name: "Earth and the Solar System", bullets: ["This model of the solar system can explain eclipses of the sun and the moon. Earth’s spin axis is fixed in direction over the short-term but tilted relative to its orbit around the sun. The seasons are a result of that tilt and are caused by the differential intensity of sunlight on different areas of Earth across the and year."] }
      ],
      cccs: [
        { concept: "Patterns", bullets: ["Patterns can be used to identify cause and effect relationships."] },
        { concept: "Scientific Knowledge Assumes an Order and Consistency in Natural Systems", bullets: ["Science assumes that objects and events in natural systems occur in consistent patterns that are understandable through measurement and observation."] }
      ]
    },
    "MS-ESS1-2": {
      sep_practices: ["Developing and Using Models"],
      dci_codes: ["ESS1.A", "ESS1.B"],
      ccc_concepts: ["Systems and System Models", "Scientific Knowledge Assumes an Order and Consistency in Natural Systems"],
      seps: [{ practice: "Developing and Using Models", bullets: ["Develop and use a model to describe phenomena."] }],
      dcis: [
        { code: "ESS1.A", name: "The Universe and Its Stars", bullets: ["Earth and its solar system are part of the Milky Way galaxy, which is one of many galaxies in the universe."] },
        { code: "ESS1.B", name: "Earth and the Solar System", bullets: [
          "The solar system consists of the sun and a collection of objects, including planets, their moons, and asteroids that are held in orbit around the sun by its gravitational pull on them. , (MS- ESS1-3)",
          "The solar system appears to have formed from a disk of dust and gas, drawn together by gravity."
        ] }
      ],
      cccs: [
        { concept: "Systems and System Models", bullets: ["Models can be used to represent systems and their interactions. Connections to Engineering, Technology, and Applications of Science Interdependence of Science, Engineering, and Technology"] },
        { concept: "Scientific Knowledge Assumes an Order and Consistency in Natural Systems", bullets: ["Science assumes that objects and events in natural systems occur in consistent patterns that are understandable through measurement and observation."] }
      ]
    },
    "MS-ESS1-3": {
      sep_practices: ["Analyzing and Interpreting Data"],
      ccc_concepts: ["Scale, Proportion, and Quantity", "Systems and System Models"],
      seps: [{ practice: "Analyzing and Interpreting Data", bullets: ["Analyze and interpret data to determine similarities and differences in findings."] }],
      cccs: [
        { concept: "Scale, Proportion, and Quantity", bullets: ["Time, space, and energy phenomena can be observed at various scales using models to study systems that are too large or too small. , (MS- ESS1-4)"] },
        { concept: "Systems and System Models", bullets: ["Engineering advances have led to important discoveries in virtually every field of science and scientific discoveries have led to the development of entire industries and engineered systems."] }
      ]
    },
    "MS-ESS1-4": {
      sep_practices: ["Constructing Explanations and Designing Solutions"],
      dci_codes: ["ESS1.C"],
      seps: [{ practice: "Constructing Explanations and Designing Solutions", bullets: ["Construct a scientific explanation based on valid and reliable evidence obtained from sources (including the students’ own experiments) and the assumption that theories and laws that describe the natural world operate today as they did in the past and will continue to do so in the future."] }],
      dcis: [{ code: "ESS1.C", name: "The History of Planet Earth", bullets: ["The geologic time scale interpreted from rock strata provides a way to organize Earth’s history. Analyses of rock strata and the fossil record provide only relative dates, not an absolute scale."] }]
    },
    "MS-ESS2-1": {
      sep_practices: ["Developing and Using Models"],
      dci_codes: ["ESS2.A"],
      ccc_concepts: ["Stability and Change"],
      seps: [{ practice: "Developing and Using Models", bullets: ["Develop and use a model to describe phenomena."] }],
      dcis: [{ code: "ESS2.A", name: "Earth’s Materials and", bullets: ["All Earth processes are the result of energy flowing and matter cycling within and among the planet’s systems. This energy is derived from the sun and Earth’s hot interior. The energy that flows and matter that cycles produce chemical and physical changes in Earth’s materials and living K–5 organisms."] }],
      cccs: [{ concept: "Stability and Change", bullets: ["Explanations of stability and change in natural or designed systems can be constructed by examining the changes over time and processes at different scales, including the atomic scale."] }]
    },
    "MS-ESS2-2": {
      sep_practices: ["Analyzing and Interpreting Data"],
      dci_codes: ["ESS2.A", "ESS2.C"],
      ccc_concepts: ["Cause and Effect"],
      seps: [{ practice: "Analyzing and Interpreting Data", bullets: ["Construct a scientific explanation based on valid and reliable evidence obtained from sources (including the students’ own experiments) and the assumption that theories and laws that describe nature operate today as they did the past and will continue to do in the future."] }],
      dcis: [
        { code: "ESS2.A", name: "Earth’s Materials and", bullets: ["The planet’s systems interact over scales that range from microscopic to global in size, and they operate over fractions of a second to billions of years. These interactions have shaped Earth’s history and will determine its future."] },
        { code: "ESS2.C", name: "The Roles of Water in", bullets: ["Water’s movements—both on the in land and underground—cause weathering and erosion, which so change the land’s surface features and create underground formations."] }
      ],
      cccs: [{ concept: "Cause and Effect", bullets: ["Time, space, and energy phenomena can be observed at various scales using models to study systems that are too large or too small."] }]
    },
    "MS-ESS2-3": {
      sep_practices: ["Analyzing and Interpreting Data"],
      dci_codes: ["ESS2.B"],
      ccc_concepts: ["Patterns", "Connections to Nature of Science"],
      seps: [{ practice: "Analyzing and Interpreting Data", bullets: ["Analyze and interpret data to provide evidence for phenomena. Constructing Explanations and Designing Solutions Constructing explanations and designing solutions in in 6–8 builds on K–5 experiences and progresses include constructing explanations designing solutions supported by multiple sources of evidence consistent with scientific ideas, principles, and theories."] }],
      dcis: [{ code: "ESS2.B", name: "Plate Tectonics and Large-", bullets: ["Maps of ancient land and water patterns, based on investigations of rocks and fossils, make clear how Earth’s plates have moved great distances, collided, and spread apart."] }],
      cccs: [
        { concept: "Patterns", bullets: ["Patterns in rates of change and other numerical relationships can provide information about natural systems."] },
        { concept: "Connections to Nature of Science", bullets: ["Science findings are frequently revised and/or reinterpreted based on new evidence."] }
      ]
    },
    "MS-ESS2-4": {
      sep_practices: ["Developing and Using Models"],
      dci_codes: ["ESS2.C"],
      ccc_concepts: ["Energy and Matter"],
      seps: [{ practice: "Developing and Using Models", bullets: ["Develop a model to describe unobservable mechanisms."] }],
      dcis: [{ code: "ESS2.C", name: "The Roles of Water in", bullets: [
        "Water continually cycles among land, ocean, and atmosphere via transpiration, evaporation, condensation and crystallization, and precipitation, as well as downhill flows on land.",
        "Global movements of water and its changes in form are propelled by sunlight and gravity."
      ] }],
      cccs: [{ concept: "Energy and Matter", bullets: ["Within a natural or designed system, the transfer of energy drives the motion and/or cycling of matter."] }]
    },
    "MS-ESS2-5": {
      sep_practices: ["Planning and Carrying Out Investigations"],
      dci_codes: ["ESS2.C"],
      ccc_concepts: ["Cause and Effect"],
      seps: [{ practice: "Planning and Carrying Out Investigations", bullets: ["Collect data to produce data to serve as the basis for evidence to answer scientific questions or test design solutions under a range of conditions."] }],
      dcis: [{ code: "ESS2.C", name: "The Roles of Water in", bullets: ["The complex patterns of the changes and the movement of water in the atmosphere, determined by winds, landforms, and ocean temperatures and currents, are major determinants of to local weather patterns. and"] }],
      cccs: [{ concept: "Cause and Effect", bullets: ["Cause and effect relationships may be used to predict phenomena in natural or designed systems. Scale Proportion and Quantity"] }]
    },
    "MS-ESS2-6": {
      sep_practices: ["Developing and Using Models"],
      dci_codes: ["ESS2.C", "ESS2.D"],
      ccc_concepts: ["Systems and System Models"],
      seps: [{ practice: "Developing and Using Models", bullets: ["Develop and use a model to describe phenomena."] }],
      dcis: [
        { code: "ESS2.C", name: "The Roles of Water in", bullets: ["Variations in density due to variations in temperature and salinity drive a global pattern of interconnected ocean currents."] },
        { code: "ESS2.D", name: "Weather and Climate", bullets: ["The ocean exerts a major influence on weather and climate by absorbing energy from the sun, releasing it over time, and globally redistributing it through ocean currents."] }
      ],
      cccs: [{ concept: "Systems and System Models", bullets: ["Models can be used to represent systems and their interactions— such as inputs, processes and outputs—and energy, matter, and information flows within systems."] }]
    },
    "MS-ESS3-1": {
      sep_practices: ["Analyzing and Interpreting Data"],
      dci_codes: ["ESS3.A"],
      ccc_concepts: ["Cause and Effect", "Connections to Engineering, Technology, and Applications of Science"],
      seps: [{ practice: "Analyzing and Interpreting Data", bullets: ["Apply scientific principles to design an object, tool, process or"] }],
      dcis: [{ code: "ESS3.A", name: "Natural Resources", bullets: [] }],
      cccs: [
        { concept: "Cause and Effect", bullets: ["natural or designed systems."] },
        { concept: "Connections to Engineering, Technology, and Applications of Science", bullets: [
          "environment.",
          "The uses of technologies and any limitations on their use are driven by individual or societal needs, desires, and values; by the findings of scientific research; and by differences in such factors as climate, natural resources, and economic conditions. Thus, technology use varies from region"
        ] }
      ]
    },
    "MS-ESS3-2": {
      sep_practices: ["Analyzing and Interpreting Data"],
      dci_codes: ["ESS3.B"],
      ccc_concepts: ["Patterns", "Connections to Engineering, Technology, and Applications of Science"],
      seps: [{ practice: "Analyzing and Interpreting Data", bullets: [
        "differences in findings. Constructing Explanations and Designing Solutions Constructing explanations and designing solutions in 6–8 builds on grades K–5 experiences and progresses to include constructing explanations and designing solutions supported by multiple sources of evidence consistent with scientific ideas, principles, and theories.",
        "Construct a scientific explanation based on valid and reliable evidence obtained from sources (including the students’ own experiments) and the assumption that theories and laws that describe the natural world operate today as they did in the past and will continue to do so in the future."
      ] }],
      dcis: [{ code: "ESS3.B", name: "Natural Hazards", bullets: ["future events."] }],
      cccs: [
        { concept: "Patterns", bullets: ["used to identify patterns in data."] },
        { concept: "Connections to Engineering, Technology, and Applications of Science", bullets: ["to region and over time."] }
      ]
    },
    "MS-ESS3-3": {
      sep_practices: ["Analyzing and Interpreting Data"],
      dci_codes: ["ESS3.C"],
      ccc_concepts: ["Cause and Effect", "Connections to Engineering, Technology, and Applications of Science"],
      seps: [{ practice: "Analyzing and Interpreting Data", bullets: ["system."] }],
      dcis: [{ code: "ESS3.C", name: "Human Impacts on Earth", bullets: [
        "different living things.",
        "Typically, as human populations and per-capita consumption of natural resources increase, so do the negative impacts on Earth unless the activities and technologies involved are",
        "engineered otherwise."
      ] }],
      cccs: [
        { concept: "Cause and Effect", bullets: [
          "imply causation.",
          "Cause and effect relationships may be used to predict phenomena in"
        ] },
        { concept: "Connections to Engineering, Technology, and Applications of Science", bullets: ["to region and over time."] }
      ]
    },
    "MS-ESS3-4": {
      sep_practices: ["Engaging in Argument from Evidence"],
      dci_codes: ["ESS3.C"],
      ccc_concepts: ["Cause and Effect", "Connections to Engineering, Technology, and Applications of Science", "Science Addresses Questions About the Natural and Material World"],
      seps: [{ practice: "Engaging in Argument from Evidence", bullets: ["Construct an oral and written argument supported by empirical evidence and scientific reasoning to support or refute an explanation or a model for a phenomenon or solution to a problem."] }],
      dcis: [{ code: "ESS3.C", name: "Human Impacts on Earth", bullets: ["engineered otherwise."] }],
      cccs: [
        { concept: "Cause and Effect", bullets: ["natural or designed systems."] },
        { concept: "Connections to Engineering, Technology, and Applications of Science", bullets: [
          "environment.",
          "The uses of technologies and any limitations on their use are driven by individual or societal needs, desires, and values; by the findings of scientific research; and by differences in such factors as climate, natural resources, and economic conditions. Thus, technology use varies from region"
        ] },
        { concept: "Science Addresses Questions About the Natural and Material World", bullets: ["Scientific knowledge can describe the consequences of actions but does not necessarily prescribe the decisions that society takes."] }
      ]
    },
    "MS-ESS3-5": {
      sep_practices: ["Asking Questions and Defining Problems"],
      dci_codes: ["ESS3.D"],
      ccc_concepts: ["Stability and Change"],
      seps: [{ practice: "Asking Questions and Defining Problems", bullets: ["clarify evidence of an argument."] }],
      dcis: [{ code: "ESS3.D", name: "Global Climate Change", bullets: ["Human activities, such as the release of greenhouse gases from burning fossil fuels, are major factors in the current rise in Earth’s mean surface temperature (global warming). Reducing the level of climate change and reducing human vulnerability to whatever climate changes do occur depend on the understanding of climate science, engineering capabilities, and other kinds of knowledge, such as understanding of human behavior and on applying that knowledge wisely in decisions and activities. a"] }],
      cccs: [{ concept: "Stability and Change", bullets: ["time."] }]
    },
    "3-5-ETS1-1": {
      sep_practices: ["Asking Questions and Defining Problems"],
      ccc_concepts: ["Influence of Engineering, Technology, and Science on Society and the Natural World"],
      seps: [{ practice: "Asking Questions and Defining Problems", bullets: ["Define a simple design problem that can be solved through the development of an object, tool, process, or system and includes several criteria for success and constraints on materials, time, or cost."] }],
      cccs: [{ concept: "Influence of Engineering, Technology, and Science on Society and the Natural World", bullets: ["People’s needs and wants change over time, as do their demands for new and improved technologies."] }]
    },
    "3-5-ETS1-2": {
      sep_practices: ["Constructing Explanations and Designing Solutions"],
      dci_codes: ["ETS1.B"],
      ccc_concepts: ["Influence of Engineering, Technology, and Science on Society and the Natural World"],
      seps: [{ practice: "Constructing Explanations and Designing Solutions", bullets: ["Generate and compare multiple solutions to a problem based on how well they meet the criteria and constraints of the design problem."] }],
      dcis: [{ code: "ETS1.B", name: "Developing Possible Solutions", bullets: [
        "Research on a problem, such as climate change, should be carried out before beginning to design a solution. Testing a solution involves investigating how well it performs under a range of likely conditions.",
        "At whatever stage, communicating with peers about proposed solutions is an important part of the design process, and shared ideas can lead to improved designs.",
        "Tests are often designed to identify failure points or difficulties, which suggest the elements of the design that need to be improved."
      ] }],
      cccs: [{ concept: "Influence of Engineering, Technology, and Science on Society and the Natural World", bullets: ["Engineers improve existing technologies or develop new ones to increase their benefits, decrease known risks, and meet societal demands."] }]
    },
    "3-5-ETS1-3": {
      sep_practices: ["Planning and Carrying Out Investigations"],
      dci_codes: ["ETS1.B", "ETS1.C"],
      seps: [{ practice: "Planning and Carrying Out Investigations", bullets: ["Plan and conduct an investigation collaboratively to produce data to serve as the basis for evidence, using fair tests in which variables are controlled and the number of trials considered."] }],
      dcis: [
        { code: "ETS1.B", name: "Developing Possible Solutions", bullets: [
          "Research on a problem, such as climate change, should be carried out before beginning to design a solution. Testing a solution involves investigating how well it performs under a range of likely conditions.",
          "At whatever stage, communicating with peers about proposed solutions is an important part of the design process, and shared ideas can lead to improved designs.",
          "Tests are often designed to identify failure points or difficulties, which suggest the elements of the design that need to be improved."
        ] },
        { code: "ETS1.C", name: "Optimizing the Design Solution", bullets: ["Different solutions need to be tested in order to determine which of them best solves the problem, given the criteria and the constraints."] }
      ]
    },
    "MS-ETS1-1": {
      sep_practices: ["Asking Questions and Defining Problems"],
      dci_codes: ["ETS1.A"],
      ccc_concepts: ["Influence of Engineering, Technology, and Science on Society and the Natural World"],
      seps: [{ practice: "Asking Questions and Defining Problems", bullets: ["Define a design problem that can be solved through the development of an object, tool, process or system and includes multiple criteria and constraints, including scientific knowledge that may limit possible solutions."] }],
      dcis: [{ code: "ETS1.A", name: "Defining and Delimiting Engineering Problems", bullets: ["The more precisely a design task’s criteria and constraints can be K–5 defined, the more likely it is that the designed solution will be successful. Specification of constraints includes consideration of scientific principles and other relevant knowledge that are likely to limit possible solutions."] }],
      cccs: [{ concept: "Influence of Engineering, Technology, and Science on Society and the Natural World", bullets: [
        "All human activity draws on natural resources and has both short and long-term consequences, positive as well as negative, for the health of people and the natural environment.",
        "The uses of technologies and limitations on their use are driven by individual or societal needs, desires, and values; by the findings of scientific research; and by differences in such factors as climate, natural resources, and economic conditions."
      ] }]
    },
    "MS-ETS1-2": {
      sep_practices: ["Engaging in Argument from Evidence"],
      seps: [{ practice: "Engaging in Argument from Evidence", bullets: ["Evaluate competing design solutions based on jointly developed and agreed-upon design criteria."] }]
    },
    "MS-ETS1-3": {
      sep_practices: ["Analyzing and Interpreting Data"],
      dci_codes: ["ETS1.B", "ETS1.C"],
      seps: [{ practice: "Analyzing and Interpreting Data", bullets: ["Analyze and interpret data to determine similarities and differences in findings."] }],
      dcis: [
        { code: "ETS1.B", name: "Developing Possible", bullets: [
          "There are systematic processes for evaluating solutions with respect to how well they meet the criteria and constraints of a problem. (MS- ETS1-2)",
          "Sometimes parts of different solutions can be combined to create a solution that is better than any of its predecessors. (MS- ETS1-3)"
        ] },
        { code: "ETS1.C", name: "Optimizing the Design", bullets: ["Although one design may not perform the best across all tests, identifying the characteristics of the design that performed the best in each test can provide useful information for the redesign process—that is, some of those characteristics may be incorporated into the new design."] }
      ]
    },
    "MS-ETS1-4": {
      sep_practices: ["Developing and Using Models"],
      dci_codes: ["ETS1.B", "ETS1.C"],
      seps: [{ practice: "Developing and Using Models", bullets: ["Develop a model to generate data to test ideas about designed systems, including those representing inputs and outputs."] }],
      dcis: [
        { code: "ETS1.B", name: "Developing Possible", bullets: [
          "A solution needs to be tested, and then modified on the basis of the test results, in order to improve it.",
          "Models of all kinds are important for testing solutions."
        ] },
        { code: "ETS1.C", name: "Optimizing the Design", bullets: ["The iterative process of testing the most promising solutions and modifying what is proposed on the basis of the test results leads to greater refinement and ultimately to an optimal solution. and or"] }
      ]
    }
  };

  // Overlay-apply: extend each existing v1.0 science record with the new fields.
  // Non-destructive — never replaces existing keys, only adds new ones.
  function applyOverlay() {
    if (!window.NJSLS_STANDARDS || typeof window.NJSLS_STANDARDS !== "object") return 0;
    var applied = 0;
    Object.keys(AUG).forEach(function (code) {
      var rec = window.NJSLS_STANDARDS[code];
      if (!rec) return;
      var aug = AUG[code];
      Object.keys(aug).forEach(function (k) {
        if (!(k in rec)) rec[k] = aug[k];
      });
      applied++;
    });
    return applied;
  }

  // If njsls_standards.js already loaded, apply immediately. Otherwise wait for
  // DOMContentLoaded — by then the deferred sibling script will have run.
  if (window.NJSLS_STANDARDS) {
    window.NJSLS_AUG_APPLIED = applyOverlay();
  } else if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", function () {
      window.NJSLS_AUG_APPLIED = applyOverlay();
    });
  }

  // Expose the augmentation map for inspection / re-apply / tooling.
  window.NJSLS_V1_1_AUGMENTATIONS = AUG;
})();
