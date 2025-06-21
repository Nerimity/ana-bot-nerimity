
export const command = "counterwatch";
export const description = "See which Overwatch hero is a counter to another hero.";
export const args = "<hero name> <your role>?";



// https://raw.githubusercontent.com/AyQWERTY/Overwatch-2-Counters/refs/heads/main/scripts/heroes.js

const roles = [
  {
    id: "damage",
    alias: ["damage", "dps", "dam", "dmg", "d"],
  },
  {
    id: "tank",
    alias: ["tank", "tanks", "t"],
  },
  {
    id: "support",
    alias: ["support", "healer", "heal", "s", "sup"],
  },
]



const data = [
  {
    "name": "Freja",
    role: "damage",
    counters: {
        "Cassidy": "His accurate hitscan shots and stun can punish Freja when she's in the air or trying to escape.",
        "Soldier76": "His consistent hitscan damage and biotic field for self-sustain make him effective at pressuring Freja from range.",
        "Sombra": "Her hack can disable Freja's abilities, making her a much easier target to eliminate.",
        "Reaper": "His ability to teleport and deal high close-range damage allows him to surprise and burst down Freja.",
        "Tracer": "Her high mobility makes her difficult for Freja to hit, and she can pressure Freja with sustained damage and quick escapes.",
        "Widowmaker": "A skilled Widowmaker can one-shot Freja from a distance, shutting down her aerial threats.",
        "Ashe": "Her long-range hitscan damage and Dynamite can force Freja out of advantageous positions.",
        "Sojourn": "Her railgun can deliver significant burst damage to Freja, especially when charged up.",
        "D.Va": "As a dive tank, D.Va can chase Freja in the air and use Defense Matrix to block her projectiles.",
        "Winston": "He can dive onto Freja, disrupting her positioning and applying consistent damage with his Tesla Cannon.",
        "Genji": "His agility and Reflect can counter Freja's projectiles and allow him to engage her effectively.",
        "Lucio": "His speed boost can help allies evade Freja's attacks, and his healing can sustain the team through her damage.",
        "Moira": "Her Fade ability allows her to escape Freja's burst, and her Biotic Orb can apply sustained pressure.",
        "Kiriko": "Her Protection Suzu can cleanse Freja's damaging effects, and her teleport offers an escape.",
        "Baptiste": "His Immortality Field can deny Freja's burst damage, and his accurate rifle can pressure her from range.",
        "Juno": "Her homing missiles can be effective at forcing Freja to reposition, even if she's airborne."
      }
  },
    {
        "name": "Ashe",
        "role": "damage",
        "counters": {
            "Winston": "Can leap to Ashe's high ground and disrupt her aim with his barrier and Tesla Cannon",
            "D.Va": "Defense Matrix negates Ashe’s shots and she can quickly dive Ashe to pressure her",
            "WreckingBall": "Extremely mobile; he can knock Ashe away from vantage points and is hard for her to hit",
            "Genji": "Deflects Ashe’s rifle shots and uses his mobility to dive her in the backline",
            "Tracer": "Small and fast target that can dodge Ashe’s shots and flank her easily",
            "Widowmaker": "Outranges Ashe; can eliminate her with a single long-range headshot before Ashe can react",
            "Ana": "Long-range hitscan can duel Ashe, and Sleep Dart can shut down her ultimate (B.O.B.)",
            "Baptiste": "Immortality Field negates Ashe’s burst damage (and B.O.B), while his hitscan fire challenges her at range",
            "Kiriko": "Protection Suzu cleanses Ashe’s Dynamite burn, and Kiriko’s swift headshots threaten Ashe from any angle"
        }
    },
    {
        "name": "Bastion",
        "role": "damage",
        "counters": {
            "D.Va": "Boosters let her close distance and Defense Matrix blocks Bastion’s Sentry mode barrage at close range",
            "Orisa": "Fortify lets her survive Bastion’s burst, and Javelin Spin + Throw can interrupt Bastion’s Sentry or ultimate",
            "Sigma": "Can deploy a shield to block Bastion’s line of fire and use Accretion (rock) to stun Bastion out of turret mode",
            "Sombra": "Hack disables Bastion’s transformation and mobility, leaving him vulnerable in turret form",
            "Widowmaker": "Can engage from beyond Bastion’s effective range, picking him off with a high-damage snipe",
            "Genji": "Deflect returns Bastion’s high DPS back at him, and Genji can close distance while Bastion is reloading or relocating",
            "Ana": "Sleep Dart can immobilize Bastion during Sentry mode, and Biotic Grenade prevents him from being healed through damage",
            "Zenyatta": "Discord Orb amplifies damage Bastion takes, making him easier to burst down, and Zenyatta can snipe from afar with charged shots",
            "Baptiste": "Immortality Field protects teammates from Bastion’s burst damage, and his amplified burst fire can quickly take Bastion out"
        }
    },
    {
        "name": "Cassidy",
        "role": "damage",
        "counters": {
            "Winston": "Jumps onto Cassidy to deny his mid-range comfort and bubbles to block Cassidy’s shots",
            "WreckingBall": "Rolls through and knocks Cassidy around, making it hard for Cassidy to land accurate shots",
            "Doomfist": "Uses quick engages and crowd control (Rocket Punch, etc.) to prevent Cassidy from lining up shots or using Deadeye safely",
            "Pharah": "Stays airborne where Cassidy struggles to hit, raining rockets while largely avoiding his effective range",
            "Widowmaker": "Engages Cassidy from distances he cannot contest, often killing him before he can get in range",
            "Tracer": "Outmaneuvers Cassidy with superior mobility, making his shots and Magnetic Grenade hard to land",
            "Kiriko": "Cleanses Cassidy’s Magnetic Grenade from allies with Protection Suzu and can escape his close-range threat with Swift Step",
            "Baptiste": "Can survive Cassidy’s burst with Regenerative Burst or Immortality Field and duel Cassidy using his accurate hitscan rifle",
            "Lucio": "Difficult for Cassidy to hit due to Lucio’s speed; Lucio can boop Cassidy to disrupt his aim or cancel Deadeye by knocking him out of line-of-sight"
        }
    },
    {
        "name": "Echo",
        "role": "damage",
        "counters": {
            "D.Va": "Can fly up to contest Echo in the air and use Defense Matrix to nullify Echo’s sticky bombs and focusing beam",
            "Winston": "Leaps to Echo’s position and uses Tesla Cannon (which requires no aim) to damage her, forcing Echo out of the sky",
            "Sigma": "Deploys a barrier and uses long-range projectiles to pressure Echo; Kinetic Grasp absorbs her burst damage while Accretion can knock her from the air",
            "Ashe": "Hitscan that can consistently hit Echo at range, and Dynamite’s splash damages Echo even while flying",
            "Widowmaker": "One fully charged headshot will eliminate Echo in mid-air, countering Echo’s aerial advantage with pure range and damage",
            "Soldier76": "Hitscan rifle and Helix Rockets let him reliably track and damage Echo during her flight, bringing her down quickly",
            "Ana": "Scoped rifle shots pressure Echo at long range, and a well-aimed Sleep Dart can drop Echo from the sky or cancel her Duplicate ultimate",
            "Baptiste": "Can shoot Echo out of the air with his hitscan bursts and use Immortality Field to protect allies from Echo’s burst combo when she dives",
            "Zenyatta": "Discord Orb increases damage Echo takes, making her easier to eliminate, and his charged volley can unexpectedly snipe Echo out of the air"
        }
    },
    {
        "name": "Genji",
        "role": "damage",
        "counters": {
            "Winston": "Tesla Cannon ignores Genji’s Deflect and forces Genji to retreat; Winston’s leap chases Genji down when he tries to escape",
            "Orisa": "Fortify prevents Genji’s crowd control and reduces damage from Dragonblade; Javelin toss can stun Genji mid-dash or ultimate, stopping his attack",
            "Zarya": "Particle Barriers block Genji’s damage and deny him dash resets, while her beam cannot be deflected and quickly drains Genji’s health at close range",
            "Pharah": "Stays well out of Genji’s reach in the air; Genji cannot effectively deflect rockets or pressure a flying Pharah",
            "Sombra": "Hack prevents Genji from using Deflect or Swift Strike, leaving him unable to escape or block damage and making him an easy target",
            "Torbjorn": "Torb’s turret automatically targets Genji (ignoring Deflect), and Overload gives Torbjorn the durability and firepower to win close-range duels against Genji",
            "Moira": "Biotic Grasp locks onto Genji even through Deflect, and she can Fade away from him, making it hard for Genji to secure a kill",
            "Brigitte": "Her Shield Bash and Whip Shot interrupt Genji’s engage, and her armor and sustained area damage (Inspire) make diving her very unfavorable for Genji",
            "Ana": "Sleep Dart can stop Genji’s Dragonblade outright, and Biotic Grenade prevents him from healing (including any support or payload healing), making Genji much easier to finish off"
        }
    },
    {
        "name": "Hanzo",
        "role": "damage",
        "counters": {
            "Winston": "Closes the gap on Hanzo with a leap, making it difficult for Hanzo to land arrows and forcing him off sniper perches with Tesla Cannon damage",
            "D.Va": "Can use Boosters to rush Hanzo and Defense Matrix to negate his arrows, denying Hanzo the space and time he needs to line up shots",
            "WreckingBall": "Rolls into Hanzo’s position and knocks him away with Piledriver, disrupting Hanzo’s aim and making it hard for him to focus on sniping",
            "Widowmaker": "Engages Hanzo at extreme distance where her hitscan sniper rifle has an advantage over Hanzo’s slower projectile arrows",
            "Genji": "Swiftly closes distance and uses Deflect to turn Hanzo’s arrows back on him, exploiting Hanzo’s vulnerability in close-range skirmishes",
            "Tracer": "Flanks Hanzo with rapid movement; her quick bursts make it hard for Hanzo to draw a bead on her before she deals lethal damage",
            "Ana": "Can contest Hanzo from long range with hitscan shots and use Sleep Dart to neutralize him if he’s lining up a Dragonstrike or focused shot",
            "Baptiste": "Uses his Amplification Matrix and hitscan fire to duel Hanzo at range, and his Immortality Field can save allies from a burst headshot or Dragonstrike",
            "Zenyatta": "Places Discord Orb on Hanzo to increase incoming damage to him, and Zenyatta’s charged orb volleys can catch Hanzo off-guard from across the map"
        }
    },
    {
        "name": "Junkrat",
        "role": "damage",
        "counters": {
            "D.Va": "Can eat Junkrat’s grenades and RIP-Tire with Defense Matrix, and boosters allow her to chase and eliminate Junkrat in his own backline",
            "Sigma": "Shields allies from Junkrat’s explosive spam and uses Kinetic Grasp to absorb his projectiles; Sigma’s Accretion rock can interrupt Junkrat or his RIP-Tire",
            "Orisa": "Uses Fortify to avoid being knocked back or combo’d by mines and can spear spin to destroy incoming grenades; her Javelin can stun Junkrat or cancel his ultimate if thrown at the tire",
            "Pharah": "Operates outside Junkrat’s effective range by attacking from the air, making it nearly impossible for Junkrat to hit her reliably",
            "Widowmaker": "Picks Junkrat off from long range before he can close the gap or spam explosives, eliminating him with a single shot if he exposes himself",
            "Soldier76": "Outranges Junkrat and can safely destroy his traps and mines; Soldier’s sustained fire and Helix Rockets punish Junkrat when he tries to peek",
            "Ana": "Lands long-range shots on Junkrat while staying out of his grenade range, and Sleep Dart can stop a RIP-Tire in its tracks",
            "Kiriko": "Swift Steps away from Junkrat’s traps or chaos, and Protection Suzu can save allies from his burst damage or even negate his RIP-Tire explosion at the critical moment",
            "Baptiste": "Immortality Field protects the team from Junkrat’s explosive bursts and RIP-Tire, and his long-range hitscan can pick Junkrat off from a safe distance"
        }
    },
    {
        "name": "Mei",
        "role": "damage",
        "counters": {
            "D.Va": "Boosters allow D.Va to quickly close the distance or escape Mei’s freeze attempts, and Defense Matrix can nullify Mei’s alternate fire icicles",
            "Roadhog": "Can hook Mei before she closes in, dealing massive damage; Hog’s high health and Take a Breather help him survive Mei’s slow and avoid getting frozen",
            "Orisa": "Fortify prevents being frozen by Mei’s Blizzard or slowed by her primary fire, and Orisa’s Energy Javelin can stun Mei out of Cryo-Freeze or interrupt her ultimate cast",
            "Pharah": "Attacks from heights Mei can’t easily reach, preventing Mei from using her freeze effectively and bombarding her with rockets",
            "Widowmaker": "Picks off Mei from long range, well outside the reach of Mei’s Endothermic Blaster, preventing Mei from ever getting close enough to threaten her",
            "Reaper": "Deals overwhelming close-range damage that outpaces Mei’s slow; Reaper can Wraith Form out of Blizzard or any slow, and will usually win a point-blank duel against Mei",
            "Kiriko": "Protection Suzu cleanses the freeze effect from Mei’s Blizzard and can save allies from being frozen solid, while Kiriko can evade Mei with swift teleportation",
            "Baptiste": "Immortality Field keeps teammates alive through Blizzard and prevents Mei from securing kills when they are low, and Baptiste’s burst rifle lets him chip away at Mei from a safe range",
            "Lucio": "Speed Boost helps allies outrun Mei’s freeze area and Blizzard, and Lucio’s mobility makes him a very hard target for Mei to catch or slow down"
        }
    },
    {
        "name": "Pharah",
        "role": "damage",
        "counters": {
            "D.Va": "Can contest Pharah directly by flying up to her and using Defense Matrix to eat rockets, effectively dueling Pharah in the sky",
            "Sigma": "Projects a barrier to block Pharah’s rockets and fires accurate long-range shots to pressure her; his Accretion can knock Pharah out of the air if timed well",
            "Roadhog": "Hooks Pharah out of the sky when she flies too low or near, instantly grounding and eliminating her before she can use her mobility to escape",
            "Soldier76": "Hitscan bullets and a tracking visor (ultimate) allow him to steadily chip away at Pharah, and Helix Rockets deal burst if she hovers predictably",
            "Ashe": "Uses her hitscan rifle to land powerful shots on Pharah and can knock Pharah out of position mid-air with Coach Gun blast if needed",
            "Widowmaker": "Ideally positioned to eliminate Pharah at long range with a single sniper shot, ending the airborne threat before Pharah can react or get healing",
            "Ana": "Shoots Pharah from across the map with hitscan darts and can Sleep Dart Pharah if she hovers or uses Barrage, instantly stopping the ultimate",
            "Baptiste": "Can duel Pharah with his hitscan weapon and keep his team sustained under rocket fire with AoE healing; Immortality Field saves allies from Barrage’s lethal damage",
            "Zenyatta": "Discord Orb greatly increases damage Pharah takes, making her much easier for hitscans to finish off, and a charged orb volley from Zenyatta can surprise and eliminate Pharah if she’s not careful"
        }
    },
    {
        "name": "Reaper",
        "role": "damage",
        "counters": {
            "Orisa": "Fortify prevents being knocked back or easily shredded by Reaper’s shotguns, and Energy Javelin can stun or push Reaper away, cancelling his Death Blossom if timed properly",
            "Roadhog": "A well-timed Chain Hook pulls Reaper out of Wraith Form or Death Blossom, and Roadhog’s shotgun and massive health pool allow him to duel Reaper at close range, especially with Take a Breather to deny Reaper the kill",
            "Sigma": "Keeps distance with a barrier and can use Accretion (rock) to interrupt Reaper’s Death Blossom; Sigma’s ranged damage lets him chip Reaper down before Reaper can close in",
            "Pharah": "Operates high in the air where Reaper can’t reach or effectively damage her, while safely pelting him with rockets from above",
            "Mei": "Mei’s Endothermic Blaster slows Reaper’s approach, and if Reaper gets too close she can use Cryo-Freeze to deny him lifesteal or Blizzard to freeze and eliminate him",
            "Sombra": "Hack removes Reaper’s ability to Wraith or teleport, leaving him with no escape and vulnerable to focus fire; she can also interrupt Death Blossom by hacking during the wind-up",
            "Ana": "Biotic Grenade prevents Reaper from healing via his lifesteal, and Sleep Dart can stop him mid-Death Blossom or when he flanks, completely nullifying his most dangerous moves",
            "Zenyatta": "Discord Orb makes Reaper extremely squishy, and Transcendence negates the damage from Death Blossom by outhealing it, denying Reaper kills during his ultimate",
            "Baptiste": "Immortality Field can entirely counter Death Blossom’s kill potential, keeping teammates alive through the ultimate, and Baptiste’s burst damage from range pressures Reaper before he can close distance"
        }
    },
    {
        "name": "Sojourn",
        "role": "damage",
        "counters": {
            "Winston": "Jumps on Sojourn to force her out of position and uses Barrier to block her railgun shots, exploiting her vulnerability to close-range pressure",
            "D.Va": "Closes distance rapidly with boosters and can use her Defense Matrix to eat Sojourn’s Disruptor Shot (area slow) and some primary fire, preventing Sojourn from easily charging her railgun",
            "Sigma": "Deploys a shield to cut off Sojourn’s sightlines and uses Kinetic Grasp to absorb her energy shots; Sigma can also duel at mid-range with his own consistent damage, denying Sojourn free charge",
            "Genji": "Deflect can send Sojourn’s energy projectiles back at her, and Genji’s swift movement and wall-climb allow him to dive onto Sojourn, who has limited escape once her Power Slide is used",
            "Widowmaker": "Has a longer effective range; she can out-snipe Sojourn by getting a kill with a fully charged shot before Sojourn can land a charged railgun hit",
            "Tracer": "Hard for Sojourn to hit due to erratic movement; Tracer can harass Sojourn, force her to use Power Slide defensively, and finish her once her mobility is on cooldown",
            "Ana": "Can safely dart Sojourn from a distance and use Sleep Dart if Sojourn uses Overclock (ultimate) to disable the aimbot-like railgun volleys before they become lethal",
            "Baptiste": "His Immortality Field can save allies from Sojourn’s one-shot railgun kills and he can duel Sojourn at range, with Regenerative Burst keeping him alive through her poke damage",
            "Lucio": "Uses Speed Boost and wall-riding to be a very hard target for Sojourn to hit, and can knock her out of position with Soundwave, disrupting her aim and stopping her from lining up charged shots"
        }
    },
    {
        "name": "Soldier76",
        "role": "damage",
        "counters": {
            "Winston": "Leaps at Soldier to force him off high ground and out of his Biotic Field, while Winston’s Tesla Cannon cannot be dodged or blocked by Soldier",
            "D.Va": "Boosters allow her to chase down Soldier and Defense Matrix can eat his Helix Rocket, denying his burst damage and making it hard for him to finish targets",
            "Doomfist": "Uses Rocket Punch and crowd control to knock Soldier around or off ledges, interrupting Soldier’s Tactical Visor and preventing him from simply tracking targets freely",
            "Genji": "Deflect turns Soldier’s own bullets and Helix Rockets back at him, and Genji’s mobility allows him to get close to Soldier where Genji can quickly eliminate him",
            "Widowmaker": "Engages from beyond Soldier’s optimal range, killing him with a sniper shot before he can effectively fight back or force her off",
            "Sombra": "Hack disables Soldier’s Sprint and Biotic Field, leaving him immobile and without self-healing – easy prey once he’s locked in place and unable to escape or heal",
            "Ana": "Sleep Dart can shut down Soldier’s Tactical Visor, and her biotic rounds outdamage his self-heal, allowing her to duel him at range where she has the advantage",
            "Baptiste": "Immortality Field protects the team from being wiped by Tactical Visor, and Baptiste’s hitscan burst fire lets him contend with Soldier on equal footing from a defensive position",
            "Zenyatta": "Discord Orb makes Soldier much easier to burst down, and Zenyatta can use Transcendence to counteract the damage from Tactical Visor, nullifying Soldier’s ultimate pressure"
        }
    },
    {
        "name": "Sombra",
        "role": "damage",
        "counters": {
            "Winston": "Tesla Cannon hits Sombra even if she’s trying to dodge or recloak, revealing her when she’s near, and Winston’s jump chases her down when she translocates short distances",
            "Sigma": "Experimental Barrier can block hacks on teammates by breaking line-of-sight, and if Sombra decloaks, Sigma’s Accretion can stun her, preventing escape",
            "Orisa": "Fortify prevents her from being severely affected by hack (she continues firing), and Orisa’s Javelin Spin can intercept Sombra’s EMP device or translocator toss; Energy Javelin can stop Sombra’s hack channel with a well-timed hit",
            "Reaper": "High close-range damage means if Sombra engages Reaper, he can win the duel with two shotgun blasts; he’s less ability-reliant, so hack doesn’t remove his core damage and he can Wraith Form to escape if needed",
            "Widowmaker": "Infra-Sight (ultimate) exposes Sombra even in stealth, and a single headshot will eliminate Sombra if she ever uncloaks in Widow’s sight",
            "Cassidy": "Has the health and firepower to punish Sombra’s ambush; Magnetic Grenade forces Sombra to retreat or take heavy damage, and Cassidy’s hitscan shots can quickly finish her if she’s detected",
            "Brigitte": "Any damage Brigitte deals (Shield Bash or Whip Shot) will interrupt Sombra’s hack; Brig’s shield and armor make her a poor target for Sombra, and Inspire healing keeps her team healthier so Sombra’s picks are harder",
            "Moira": "Moira’s area-effect damage (Biotic Grasp stream or Biotic Orb) can reveal Sombra even in stealth and force her away; Moira can Fade out of hack or chase Sombra down with continuous damage that Sombra cannot easily avoid",
            "Kiriko": "Protection Suzu cleanses the hack effect from teammates, and Kiriko can teleport out of danger if Sombra tries to focus her. Additionally, Kiriko’s quick headshots can punish Sombra’s low health if she tries to duel"
        }
    },
    {
        "name": "Symmetra",
        "role": "damage",
        "counters": {
            "Reinhardt": "His barrier blocks Symmetra’s primary fire and turret lasers, preventing her beam from charging up; Reinhardt can safely advance and smash her turrets with his hammer",
            "Winston": "Clears Symmetra’s turrets almost instantly with Tesla Cannon and leaps on Symmetra to pressure her before she can ramp up her weapon or set up a strong defense",
            "D.Va": "Mobility allows her to hunt down Symmetra’s sentry turrets, and Defense Matrix can eat Symmetra’s charged orbs. D.Va can also chase Symmetra, who has no mobility, and finish her off up close",
            "Pharah": "Destroys Symmetra’s turrets from a safe distance and attacks Symmetra from angles she can’t retaliate against, preventing Symmetra from ever getting in range to use her beam effectively",
            "Junkrat": "Lobs grenades that can take out Symmetra’s turrets around corners or in rooms, and his mines dislodge Symmetra from fixed defensive setups. Symmetra’s teleporter and Photon Barrier do little to stop Junkrat’s explosive onslaught",
            "Widowmaker": "Picks off Symmetra or her turrets from long range; Symmetra must expose herself to do any damage, at which point Widowmaker can easily eliminate her before Symmetra can close distance",
            "Moira": "Her Biotic Orb and beam can quickly clear Symmetra’s turrets, and Moira’s mobility (Fade) allows her to avoid being cornered by Symmetra’s beam or trapped by turrets",
            "Brigitte": "Shield can block turret damage for teammates, and Whip Shot or simple melee swings can destroy Symmetra’s low-HP turrets. Brigitte’s close-range prowess and crowd control make it hard for Symmetra to commit to a beam fight",
            "Baptiste": "Uses his Exo Boots to gain high ground away from Symmetra’s effective range and systematically shoot down her turrets. His Immortality Field can save allies from Symmetra’s close-range focus fire or her explosive Photon Barrier combo plays"
        }
    },
    {
        "name": "Torbjorn",
        "role": "damage",
        "counters": {
            "D.Va": "Quickly closes the gap to Torbjorn’s turret and destroys it with sustained fire. Defense Matrix can block the turret’s shots and Torbjorn’s Rivet Gun when diving them",
            "Winston": "Leaps onto Torbjorn and his turret, zapping both at once with Tesla Cannon. Winston’s barrier can isolate the turret or Torbjorn from healing or support, making it easier to eliminate them",
            "Sigma": "Pokes down Torbjorn’s turret safely with long-range projectiles and uses his barrier to block return fire. Sigma’s Accretion can stun Torbjorn, interrupting an Overload push or even stopping Molten Core if timed perfectly",
            "Pharah": "Stays out of the turret’s reach or line-of-sight by flying and bombards both Torbjorn and his turret with rockets from afar",
            "Widowmaker": "Snipes Torbjorn or his turret from outside their effective range, dismantling Torbjorn’s setup without ever giving him a chance to fight back",
            "Genji": "Swiftly destroys the turret with shurikens or deflects its shots back at it. Genji’s mobility lets him flank Torbjorn, and Torb’s large hitbox makes him vulnerable to quick burst damage from Genji’s dash resets",
            "Ana": "Tranquilizes Torbjorn with Sleep Dart to disable him and his turret’s support, then the team can focus the turret. Biotic Grenade also stops Torbjorn from getting armor healing during Overload, making him easier to bring down",
            "Baptiste": "Can engage the turret at range with his hitscan weapon, and Immortality Field protects allies from Torbjorn’s Molten Core pools or turret focus. His regenerative burst counters chip damage from the turret while advancing",
            "Moira": "A well-aimed Biotic Orb can damage or even destroy the turret from an angle. Moira’s Fade allows her to reposition away from turret fire and pursue Torbjorn around corners where she can safely outduel him"
        }
    },
    {
        "name": "Tracer",
        "role": "damage",
        "counters": {
            "Winston": "Tesla Cannon automatically hits Tracer without needing precision, punishing her if she dives backlines. His jump can follow her blinks and his shield denies her easy damage on squishy teammates",
            "Roadhog": "One hook will catch and typically one-shot Tracer due to her low health. His large health pool and self-heal let him survive Tracer’s burst long enough to land a hook or force her recall",
            "D.Va": "High mobility to chase Tracer and micro-missiles for burst damage. D.Va can also eat Tracer’s Pulse Bomb with Defense Matrix if timed right, negating her ultimate threat",
            "Cassidy": "A landed Magnetic Grenade will severely hurt or force Tracer’s recall, and Cassidy’s steady aim can two-shot Tracer if she ventures too close",
            "Torbjorn": "His auto-aim turret constantly pressures Tracer and forces her to waste time destroying it. Additionally, Torbjorn’s Overload gives him the survivability to withstand her burst and fight back with his shotgun if she engages him",
            "Widowmaker": "Although risky, a skilled Widowmaker completely shuts Tracer down – one scoped headshot or a couple of close-range shots will kill Tracer immediately. Venom Mine can also reveal a flanking Tracer and soften her up",
            "Brigitte": "Armor and shield make her hard to burst, and Shield Bash or Whip Shot will interrupt Tracer’s momentum. Brigitte’s area-heal and Repair Packs also negate Tracer’s chip damage on teammates",
            "Moira": "Moira’s lock-on beam follows Tracer’s movements and steadily damages her while healing Moira, and Moira can Fade to avoid Pulse Bomb or escape if Tracer tries to focus her",
            "Kiriko": "Swiftstep allows Kiriko to evade Tracer’s attacks or pursue her, and Protection Suzu negates Pulse Bomb’s lethal explosion by granting brief invulnerability. Kiriko’s quick headshots can punish Tracer’s low HP if she engages carelessly"
        }
    },
    {
        "name": "Venture",
        "role": "damage",
        "counters": {
            "Winston": "Winston’s Barrier blocks Venture’s Tectonic Shock ultimate and his leap mobility lets him either escape Venture’s close-range combos or pressure Venture directly before they can set up",
            "D.Va": "Flies into Venture to contest them and uses Defense Matrix to absorb their burst damage (like drill shots), denying Venture the quick combo kills they seek",
            "Doomfist": "Excellent at disrupting close-range heroes: Doomfist’s punches and slams knock Venture around, preventing them from executing their combos cleanly, while also having the mobility to stick to or escape from Venture",
            "Cassidy": "Cassidy’s hitscan pressure and Magnetic Grenade can burst down Venture quickly, especially since Venture operates at close-to-mid range where Cassidy thrives. Cassidy also has the health to survive Venture’s initial burst and fight back",
            "Sojourn": "Outranges Venture and can escape danger with Power Slide. Sojourn can pick off Venture with a high-damage railgun shot before Venture closes in, using superior range and mobility to kite them",
            "Pharah": "Plays at a vertical angle Venture struggles to hit; Pharah can bombard Venture from above, and Venture lacks reliable tools to contest airborne targets at long range",
            "Kiriko": "Burst heals can keep allies alive through Venture’s combo damage, and Protection Suzu negates any debuff from Venture’s kit. Kiriko can also teleport away from Venture’s engage and attempt to headshot them, exploiting Venture’s short effective range",
            "Ana": "Biotic Grenade prevents Venture from self-sustaining (if they have any heal reduction abilities, it amplifies them too) and her long-range hitscan lets her harass Venture safely. Sleep Dart can also instantly stop Venture’s ultimate or burrow maneuver if timed well",
            "Lucio": "Lucio’s speed and wall-riding make him very hard for Venture to pin down. He can boop Venture away during their engage, and his constant mobility plus healing aura diminish Venture’s chances of securing quick kills"
        }
    },
    {
        "name": "Widowmaker",
        "role": "damage",
        "counters": {
            "Winston": "Closes the gap with Jump Pack and forces Widowmaker off her perch. His Barrier and Tesla Cannon nullify her sniping by blocking line-of-sight and dealing unavoidable damage up close",
            "D.Va": "Uses boosters to dive Widowmaker and harass or eliminate her. D.Va’s large health pool and Defense Matrix (though it doesn’t stop hitscan) allow her to contest Widow at close range, where Widow is weakest",
            "WreckingBall": "Rolls behind Widowmaker’s position quickly and knocks her away with a piledrive or swing, making it nearly impossible for Widow to aim. His high health and shields make him difficult for Widowmaker to kill quickly",
            "Genji": "Closes distance using wall climb and Swift Strike, then eliminates Widow with quick burst damage. Deflect can protect Genji as he approaches by sending Widow’s shots back at her or discouraging her from firing",
            "Sombra": "Stealth allows Sombra to approach Widowmaker undetected and Hack will prevent Widow from using her Grappling Hook to escape. Sombra can then finish Widow while she’s immobilized or forced to fight at close range",
            "Tracer": "Flanks Widowmaker and duels her at point-blank range where Widow is at a big disadvantage. Tracer’s blinks and recall help her dodge Widow’s aim and quickly punish any exposure",
            "Mercy": "Her Guardian Angel mobility makes Mercy extremely hard to hit, and she can resurrect allies that Widowmaker picks off, effectively undoing Widow’s kills. Mercy’s damage boost also helps teammates win sniper duels or quickly destroy Widow’s vantage point setups",
            "Ana": "Ana can challenge Widowmaker from long range with hitscan shots and a well-timed Sleep Dart will render Widowmaker helpless, setting up an easy elimination. Ana’s biotic rifle also allows her to heal while staying safely behind cover between shots",
            "Baptiste": "Baptiste’s Amplification Matrix doubles his damage, enabling him to duel Widow from afar. Additionally, Immortality Field can save a teammate from what would have been a fatal headshot, denying Widowmaker the kill and giving his team time to respond or take cover"
        }
    },
    {
        "name": "Ana",
        "role": "support",
        "counters": {
            "Winston": "His jump pack allows him to dive Ana and disrupt her aim, preventing her from healing or using Sleep Dart effectively",
            "D.Va": "Can negate Ana’s impact by using Defense Matrix to absorb her Biotic Grenades and darts, then burst her down at close range",
            "WreckingBall": "High mobility and knockbacks keep Ana constantly under pressure, making it difficult for her to land shots or abilities.  ",
            "Genji": "Swiftly dives Ana and forces her out of position, and can even deflect her Biotic shots and Sleep Dart",
            "Sombra": "Hack disables Ana’s abilities (no Sleep Dart or Biotic Grenade), leaving her defenseless and easy to eliminate",
            "Tracer": "Ana struggles to duel Tracer’s hypermobility – Tracer can blink around and be pesky as she damages Ana, then Recall to undo any damage or biotic effects",
            "Kiriko": "Her Protection Suzu instantly cleanses Ana’s anti-heal and sleep effects on allies, nullifying Ana’s biggest strengths",
            "Lucio": "Wall-riding and Speed Boost make it hard for Ana to hit her Sleep Dart or grenades, and Sound Barrier mitigates her Nano-Boost kills by giving the team extra health",
            "Baptiste": "Immortality Field can save allies from Ana’s Biotic Grenade combos or Nano-Boost burst, and his hitscan pressure forces Ana into cover.  "
        }
    },
    {
        "name": "Baptiste",
        "role": "support",
        "counters": {
            "Winston": "Winston’s barrier and leap let him bypass Baptiste’s setup, pressuring him on high ground and forcing out Immortality Field.  ",
            "D.Va": "Boosters allow her to reach Baptiste and destroy his Immortality Field device quickly, while Defense Matrix eats his healing projectiles to negate their effect.  ",
            "Doomfist": "His mobility and crowd control let him punch Baptiste away from his team or slam him out of position, preventing Baptiste from freely using his regenerative burst or lamp.  ",
            "Sombra": "Hack disables Baptiste’s Exo Boots and Immortality Field, making him an easy target when he cannot escape or protect himself",
            "Reaper": "Reaper’s close-range damage can overwhelm Baptiste, and he can Wraith Form to ignore Baptiste’s damage while closing the gap",
            "Genji": "Genji can climb to Baptiste’s position and pressure him with shurikens or Swift Strike, and even deflect Baptiste’s shots back at him",
            "Ana": "Ana’s Biotic Grenade prevents Baptiste from healing himself or his team, and Sleep Dart can catch him if he’s stationary using Amplification Matrix.  ",
            "Lucio": "Lucio can wall-ride to chase or boop Baptiste off high ground, disrupting his positioning and making it easier to focus him down.  ",
            "Zenyatta": "Zenyatta’s Discord Orb makes Baptiste much easier to burst through his self-healing, and long-range volleys pressure Baptiste into using Immortality Field early.  "
        }
    },
    {
        "name": "Brigitte",
        "role": "support",
        "counters": {
            "Sigma": "His long-range Hyperspheres and Accretion rock let him punish Brigitte from a distance outside of her flail range.  ",
            "Roadhog": "Hook can pull Brigitte out from behind her shield, and his high burst damage can break through her armor and self-heal before she can retaliate.  ",
            "Ramattra": "In Nemesis form he can punch through Brigitte’s shield and out-range her, while Brigitte struggles to get past his health pool and piercing punches.  ",
            "Pharah": "Brigitte struggles against airborne heroes – Pharah can hit her with rockets from above where Brigitte cannot effectively retaliate",
            "Junkrat": "His explosives deal heavy damage to Brigitte and rapidly break her shield, keeping her on the defensive",
            "Widowmaker": "Widowmaker outranges Brigitte and can pick her off from afar since Brigitte has no tools to contest a distant sniper",
            "Ana": "Ana can safely dart Brigitte with Sleep or Anti-heal from outside Brigitte’s reach, negating Brigitte’s sustain and setting her up for a focused kill.  ",
            "Zenyatta": "Zenyatta can pepper Brigitte with orbs from long range; a Discord Orb combined with charged volleys will melt Brigitte before she can close the gap.  ",
            "Baptiste": "Baptiste’s hitscan rifle and area healing allow him to duel Brigitte from mid-range, and his Immortality Field can nullify Brigitte’s Rally engage attempts.  "
        }
    },
    {
        "name": "Illari",
        "role": "support",
        "counters": {
            "Winston": "Winston can leap to Illari’s high-ground positions and disrupt her, making it hard for her to line up charged shots or keep her healing pylon safe",
            "D.Va": "D.Va’s mobility lets her dive Illari and quickly destroy her healing pylon. Illari’s railgun shots are hitscan (not absorbable), but D.Va can close distance to negate Illari’s range advantage.  ",
            "WreckingBall": "Ball’s rapid engagements knock Illari around and force her to reposition constantly, denying her the steady aim needed for her long-range damage.  ",
            "Genji": "Genji’s mobility allows him to pressure Illari and her pylon, and he can deflect her Solar Rifle shots back at her or swiftly dash in when she’s distracted",
            "Sombra": "Hack disables Illari’s healing pylon and prevents her from using Outburst to reposition, leaving Illari vulnerable to follow-up attacks",
            "Widowmaker": "Illari deals damage at range, but a sniper like Widowmaker can outrange and one-shot her if she’s peeking – Widow can eliminate Illari before she can impact the fight.  ",
            "Ana": "Ana’s toolkit counters Illari’s strengths – a Biotic Grenade can prevent Illari from healing through her pylon or ultimate, and a well-timed Sleep Dart can stop Illari’s **Captive Sun** ultimate or catch Illari when she overpeeks.  ",
            "Kiriko": "Protection Suzu can cleanse the burning effect from Illari’s Captive Sun ultimate, negating its kill potential, and Kiriko’s swift mobility and precise kunai can duel Illari effectively at mid-range.  ",
            "Zenyatta": "Zenyatta can fight Illari from long range; Discord Orb makes Illari easier to burst, and his charged orb volleys threaten Illari whenever she attempts to line up shots.  "
        }
    },
    {
        "name": "Juno",
        "role": "support",
        "counters": {
            "Roadhog": "Roadhog’s Chain Hook pulls Juno out of her evasive float, and his breather can shrug off her damage. Once hooked, Juno’s low health pool makes her an easy kill while grounded",
            "D.Va": "D.Va’s Boosters let her chase Juno even as Juno tries to glide away, and Defense Matrix can nullify Juno’s healing output and Pulsar Torpedoes, making it hard for Juno to sustain her team",
            "Winston": "With a leap Winston can reach Juno on high ledges and bubble her off from her team, disrupting her support and damaging her with Tesla Cannon while she’s isolated",
            "Soldier76": "Soldier’s hitscan weapon and mobility counter Juno’s aerial movement – he can reliably track her and avoid her torpedoes with Sprint, and even use Tactical Visor to finish off the evasive support",
            "Sombra": "Hack removes Juno’s mobility and prevents her from using her wall-glide, making her a sitting target. A hacked Juno cannot use her hover jets, leaving her vulnerable to focus fire.  ",
            "Genji": "Juno’s hover ability makes her susceptible to agile flankers – Genji can double-jump and dash to reach her in the air and apply lethal pressure at close range",
            "Ana": "Ana’s Biotic Grenade prevents Juno from healing her teammates (and herself via support passive) during its effect, and Sleep Dart can pacify Juno despite her mobility",
            "Zenyatta": "Discord Orb makes the relatively fragile Juno take 25% more damage, which combined with Zenyatta’s accurate long-range orbs can quickly take Juno down from a safe distance.  ",
            "Baptiste": "Baptiste can contest Juno’s high-ground positions with his hitscan rifle, and his Immortality Field nullifies Juno’s **Orbital Ray** ultimate by keeping allies alive through its damage.  "
        }
    },
    {
        "name": "Kiriko",
        "role": "support",
        "counters": {
            "Winston": "Winston can continuously chase Kiriko – his Tesla Cannon hits through her allies and Teleport, forcing her on the defensive and making her think twice about flanking.  ",
            "D.Va": "D.Va’s Defense Matrix eats Kiriko’s Kunai projectiles, negating her damage. D.Va can also pressure Kiriko’s positioning with boosters, limiting Kiriko’s ability to poke safely.  ",
            "WreckingBall": "Ball’s disruptive knock-ups and slam damage can catch Kiriko even after she teleports, keeping her off-balance so she can’t comfortably heal or land kunai.  ",
            "Sombra": "Sombra’s Hack completely disrupts Kiriko – a hacked Kiriko cannot Swift Step to escape or throw Suzu, leaving her vulnerable to follow-up",
            "Genji": "Genji’s mobility and burst let him duel Kiriko effectively; he can wall-climb to chase her and deflect her kunai, making it risky for Kiriko to take one-on-one fights",
            "Tracer": "Tracer can harass Kiriko incessantly – Kiriko’s single-target heals and burst damage are hard to land on a blinking target, and Tracer can force Kiriko to waste her teleport and then re-engage",
            "Ana": "Ana’s Sleep Dart and Biotic Grenade do not get nullified if Kiriko is caught off-guard – a slept Kiriko can be eliminated before she can react, and anti-heal stops Kiriko from saving her team with burst healing.  ",
            "Moira": "Moira’s Fade and sustain allow her to outlast Kiriko in a duel. Since Kiriko needs to land headshots to quickly kill a Moira, Moira can often force Kiriko to retreat by steadily draining her health.  ",
            "Brigitte": "Brigitte’s shield and armor let her survive Kiriko’s burst. In close range, Brig can interrupt Kiriko’s kunai throws with Shield Bash or Whip Shot, and Kiriko has no sustain to withstand Brig’s melee damage.  "
        }
    },
    {
        "name": "Lifeweaver",
        "role": "support",
        "counters": {
            "Winston": "Winston’s dive directly counters Lifeweaver’s tendency to stay back – he can jump onto Lifeweaver, bypass the Petal Platform with ease, and force Lifeweaver to fight instead of freely healing from afar.  ",
            "D.Va": "D.Va can use boosters to chase Lifeweaver and focus him down. She can also quickly target and destroy Lifeweaver’s Petal Platform or mitigate Life Grip pulls by pressuring the relocated ally immediately.  ",
            "Doomfist": "Doomfist’s mobility and crowd control let him single out Lifeweaver – a well-timed Rocket Punch can knock Lifeweaver away from his team or interrupt his healing, making him easy to eliminate.  ",
            "Sombra": "Hack disables Lifeweaver’s Petal Platform and Life Grip, leaving him unable to escape or save teammates. Without his utility, his low mobility makes him an easy dive target",
            "Pharah": "Lifeweaver has no offensive capability against airborne heroes – Pharah can rain rockets down on him and his team, and Lifeweaver’s large hitbox makes him an easy target from above",
            "Genji": "Genji’s burst damage and mobility allow him to easily pressure Lifeweaver. He can chase Lifeweaver onto his Petal Platform and deflect the Thorn Volley, punishing Lifeweaver’s lack of self-defense",
            "Ana": "Ana’s Biotic Grenade nullifies Lifeweaver’s healing burst (Rejuvenating Dash and charged Blossom), and a dart can put him to sleep if he exposes himself to line-of-sight.  ",
            "Lucio": "Lucio’s speed and boop counter Lifeweaver’s positioning – he can knock Lifeweaver or his allies off the Petal Platform and speed his team out of the area when Lifeweaver uses his Tree of Life ultimate.  ",
            "Zenyatta": "Zenyatta’s Discord Orb makes Lifeweaver’s massive hitbox a liability, allowing the team to quickly focus him down despite any healing, and Zenyatta can pick at Lifeweaver from ranges Lifeweaver can’t retaliate.  "
        }
    },
    {
        "name": "Lucio",
        "role": "support",
        "counters": {
            "Winston": "Winston’s Tesla Cannon can hit Lucio as he wall-rides, and Winston can leap after Lucio to prevent him from freely harassing the backline.  ",
            "D.Va": "D.Va’s boosters and spread shots let her chase Lucio around and pressure him, while her Defense Matrix can eat Lucio’s projectile sound waves to negate his damage output.  ",
            "WreckingBall": "WreckingBall’s speed and knockback can keep up with Lucio. Ball can bump Lucio away from walls and disrupt his movement, making Lucio easier for the team to hit.  ",
            "Pharah": "Pharah attacks from angles Lucio can’t easily contest – she can bombard him or his team from the air, where Lucio’s projectile shots are hard to land",
            "Reaper": "If Lucio gets too close, Reaper can burst him down quickly with shotguns. Lucio’s small damage output can’t outduel Reaper’s lifesteal in close quarters.  ",
            "Mei": "Mei’s Endothermic Blaster can slow or even briefly freeze Lucio if he comes within range, making it easy to finish him off when he tries to skate away.  ",
            "Ana": "Ana’s Sleep Dart can knock Lucio out of his wall-ride, and a Biotic Grenade will prevent him from healing through chip damage, punishing Lucio’s hit-and-run tactics.  ",
            "Moira": "Moira’s lock-on Biotic Grasp can track Lucio even during his evasive wall maneuvers, and Moira can Fade to avoid Lucio’s boop then continue draining his health.  ",
            "Brigitte": "Brigitte’s area healing and armor make her resilient to Lucio’s harassment, and she can knock him back with Whip Shot or bash him if he comes in range, denying him easy environmental kills.  "
        }
    },
    {
        "name": "Mercy",
        "role": "support",
        "counters": {
            "Winston": "Winston is excellent at diving Mercy and her pocket – he can continuously pursue Mercy with leaps and cleave damage, making it difficult for Mercy to safely resurrect or heal under pressure.  ",
            "D.Va": "D.Va’s boosters allow her to chase a flying Mercy, and Defense Matrix can nullify the damage Mercy’s ally is outputting, effectively neutralizing Mercy’s boosted target while D.Va focuses her.  ",
            "WreckingBall": "Ball’s piledriver and knockback can disrupt Mercy’s flow, especially when she attempts to go for a resurrection. His Minefield also zones Mercy’s movement, restricting her ability to glide freely.  ",
            "Sombra": "Sombra’s Hack makes it impossible for Mercy to use Guardian Angel to escape, leaving her stranded and easy to eliminate if she’s caught out",
            "Widowmaker": "A skilled Widowmaker can snipe Mercy when she peeks to heal or resurrect – Mercy often hovers in predictable paths while boosting or healing, making her vulnerable to a well-placed headshot",
            "Ashe": "Ashe’s hitscan rifle can quickly take down a Mercy at mid-range, and her Dynamite forces Mercy out of hiding with burn damage. Ashe can also interrupt or punish a resurrection attempt with Coach Gun and rapid shots.  ",
            "Ana": "Ana can interrupt Mercy’s resurrection with a Sleep Dart and prevent her from healing her team with Biotic Grenade. Mercy’s constant movement is less effective if Ana lands a dart, leaving Mercy or her target vulnerable.  ",
            "Zenyatta": "Zenyatta’s Discord Orb on Mercy’s evasive partner (or Mercy herself) increases damage dealt to them, often overpowering Mercy’s healing. His charged volley can also catch Mercy if she glides predictably.  ",
            "Moira": "Moira’s mobility (Fade jump) and homing damage orb let her chase and pressure Mercy even as Mercy flies between allies – something many supports struggle to do. Moira can also negate Mercy’s healing by out-damaging it in a duel situation.  "
        }
    },
    {
        "name": "Moira",
        "role": "support",
        "counters": {
            "D.Va": "D.Va’s armor and Defense Matrix allow her to withstand Moira’s damage and nullify Biotic Orbs, while she closes the gap to force Moira out of position.  ",
            "Roadhog": "If Roadhog lands a hook on Moira, her Fade won’t save her in time – he can one-shot her. Also, his large health pool isn’t easily burned down by Moira’s steady damage, especially while he can self-heal.  ",
            "Orisa": "Orisa’s Fortify and high durability make Moira’s life drain relatively ineffective. Orisa can also javelin Moira to interrupt Coalescence or pin her down before she escapes.  ",
            "Sombra": "A well-timed Hack prevents Moira from using Fade, leaving her extremely vulnerable since she has no other escape. Sombra’s team can then burst Moira during the hack duration",
            "Reaper": "Reaper’s close-range burst can out-duel Moira – he can absorb the damage from her Biotic Grasp via self-healing while his shotguns quickly deplete Moira’s health",
            "Pharah": "Moira struggles against threats she cannot reach – Pharah’s high airborne damage forces Moira to either hide or use Fade defensively, as Moira has no ranged attack to reliably fight back",
            "Ana": "Ana’s Biotic Grenade stops Moira from healing herself or her team, a big blow to a hero built around steady healing and self-sustain. Sleep Dart can also cancel Moira’s Coalescence or catch her after a Fade, setting up an elimination.  ",
            "Zenyatta": "Zenyatta’s Discord Orb amplified damage makes her surprisingly fragile despite her self-healing. His orbs can also damage her from ranges where Moira cannot retaliate, forcing her to use Fade or retreat.  ",
            "Brigitte": "Brigitte’s Inspire healing and armor can counteract Moira’s area damage on her team. In close quarters, Brigitte can interrupt Moira’s lifesteal with Shield Bash or knock her away, and Moira cannot easily secure a kill on a protected Brigitte.  "
        }
    },
    {
        "name": "Zenyatta",
        "role": "support",
        "counters": {
            "Winston": "Winston is a classic Zenyatta counter – he leaps directly onto Zenyatta and bypasses Zenyatta’s lack of mobility. Winston’s Tesla Cannon cannot miss and quickly overwhelms Zen if unsupported",
            "D.Va": "D.Va can fly into the backline and pressure Zenyatta with missiles and shotguns. Zenyatta’s orbs do little to deter D.Va’s 600 HP mech, and Defense Matrix can eat Zenyatta’s projectiles to protect D.Va as she closes in.  ",
            "WreckingBall": "WreckingBall’s high mobility and knockbacks make him lethal to Zenyatta – he can piledrive to heavily damage and then finish Zen before Zen can charge a volley. Zen’s lack of escapes makes him easy prey for Ball’s quick hit-and-run attacks.  ",
            "Genji": "Genji relentlessly harasses Zenyatta – he can dash through or climb to Zenyatta’s position and deflect Zenyatta’s orbs. A swift combo of shuriken and Swift Strike often eliminates Zen before Transcendence can be used",
            "Sombra": "Sombra’s Stealth lets her flank Zenyatta and her Hack makes him unable to use Transcendence or Discord. With no escape and no defensive ult, Zenyatta is an easy kill for Sombra’s team",
            "Tracer": "Tracer is a nightmare for Zenyatta: she can blink past his team and unload a full clip into him faster than he can charge a volley. His low health and lack of mobility mean Tracer can consistently duel and eliminate him if he’s unprotected.  ",
            "Ana": "Ana’s Biotic Grenade completely negates Zenyatta’s Transcendence healing (anti-healed allies receive no healing from Trans), and Sleep Dart can catch Zenyatta at range due to his slow movement",
            "Kiriko": "Kiriko’s Protection Suzu can cleanse Discord Orb from a critical ally, countering Zenyatta’s primary threat. Additionally, Kiriko’s fast-flying kunai and teleport give her tools to pressure or escape Zenyatta, who cannot chase or dodge well.  ",
            "Lucio": "Lucio can exploit Zenyatta’s immobility by knocking him out of position or into his team. His speed boost also helps allies close the gap on Zen or disengage from a discorded target, reducing Zenyatta’s effectiveness.  "
        }
    },
    {
        "name": "D.Va",
        "role": "tank",
        "counters": {
            "Zarya": "Zarya’s Particle Barriers completely nullify D.Va’s burst and stop her Self-Destruct kills, while Zarya’s beam bypasses Defense Matrix entirely to melt D.Va’s mech",
            "Reinhardt": "Reinhardt’s large barrier blocks D.Va’s Micro Missiles and fusion cannons, and his Rocket Hammer swings aren’t affected by Defense Matrix – he can out-brawl D.Va up close",
            "Sigma": "Sigma’s Accretion (rock) can stun D.Va out of her boosters, and his Experimental Barrier blocks her damage. He can absorb her close-range burst with Kinetic Grasp, turning D.Va’s aggression into shields",
            "Reaper": "Reaper’s shotguns deal massive close-range damage that can quickly force D.Va out of her mech, and he can use Wraith Form to avoid her Self-Destruct blast or negate her return fire",
            "Symmetra": "Symmetra’s sustained beam ignores Defense Matrix and ramps up damage the longer it hits D.Va, shredding her mech quickly. Her Sentry Turrets also slow D.Va down, making it harder for D.Va to escape once engaged",
            "Mei": "Mei’s freeze effects (primary spray and Blizzard) bypass Defense Matrix and can lock D.Va in place, preventing her from escaping. Mei can also block D.Va’s boosters or line of sight with an Ice Wall",
            "Zenyatta": "Zenyatta’s Orb of Discord makes D.Va take increased damage, allowing teammates to burst her down before she can react. His charged volleys and Transcendence can negate D.Va’s Self-Destruct by keeping the team healthy",
            "Brigitte": "Brigitte’s Shield Bash and Whip Shot can disrupt D.Va’s boosters, and her close-range sustain (armor + self-healing) makes it difficult for D.Va to secure a kill. Brig’s barrier can also absorb some of D.Va’s Micro Missile burst",
            "Moira": "Moira’s biotic beam and Coalescence ignore Defense Matrix, steadily damaging D.Va while healing Moira’s allies. Moira’s sustain and Fade allow her to duel D.Va for an extended time, often forcing D.Va to retreat"
        }
    },
    {
        "name": "Doomfist",
        "role": "tank",
        "counters": {
            "Orisa": "Orisa’s Fortify makes her immune to Doomfist’s knockbacks and stuns, negating his Rocket Punch combo, and she can use Javelin Spin to block his Seismic Slam damage",
            "Zarya": "Zarya’s bubbles protect teammates from Doomfist’s punches and give her energy when he hits them. Her beam deals consistent damage that ignores his mobility, and she can survive his dive by self-bubbling to deny his shield gain.  ",
            "Sigma": "Sigma can punish Doomfist’s engagements with Accretion – a well-timed rock will stun Doomfist mid-leap or mid-punch. Additionally, Sigma’s shield and Kinetic Grasp reduce the impact of Doomfist’s abilities on the backline.  ",
            "Sombra": "Sombra’s Hack disables Doomfist’s gauntlet abilities (mobility and shield gain), leaving him vulnerable and unable to escape after diving",
            "Pharah": "Pharah can stay airborne where Doomfist struggles to reach her. She can bombard him and his team from above; Doomfist’s lack of long-range attacks makes it hard for him to counter Pharah’s sustained rocket damage",
            "Reaper": "Reaper’s close-range firepower punishes Doomfist when he dives in. Even if Doomfist uses Power Block to reduce damage, Reaper can wait it out or reposition with Wraith Form, then continue dealing heavy damage up close.  ",
            "Ana": "Ana’s Sleep Dart and Biotic Grenade stop Doomfist cold – a slept Doomfist can be focused down, and anti-heal prevents him from gaining the shields he relies on, making him much easier to kill.  ",
            "Brigitte": "Brigitte’s passive healing and barrier help her team survive Doomfist’s dive. She can knock him back with Whip Shot, interrupting his combos and giving her allies time to react, and during Rally her bash will even stun Doomfist in his tracks.  ",
            "Kiriko": "Kiriko’s Protection Suzu can cleanse the stun effect on allies punched into walls by Doomfist, denying him kills. She can also Swift Step away from his engagements and contribute kunai headshots while he is busy diving her team.  "
        }
    },
    {
        "name": "Hazard",
        "role": "tank",
        "counters": {
            "Reinhardt": "Reinhardt’s large barrier and strong melee damage let him negate Hazard’s spike volleys and close the distance to out-brawl Hazard. His shield can block Hazard’s projectile wall, and a well-timed Earthshatter can catch Hazard despite his mobility",
            "Orisa": "Orisa’s Fortify prevents Hazard’s knockback and crowd control from affecting her, and her javelin attacks can interrupt Hazard’s abilities. She has the sustained damage and durability to withstand Hazard’s close-range burst, shutting down his value",
            "Sigma": "Sigma’s barrier and consistent ranged damage counter Hazard’s setups. Sigma can block Hazard’s spikes with his shield, stun him with Accretion if he leaps in, and absorb damage with Kinetic Grasp, denying Hazard the quick kills he seeks",
            "Ashe": "Ashe’s long-range hitscan shots and area denial (Dynamite) lock Hazard out of effective range. She can shoot from a safe distance where Hazard’s leaping melee attacks are useless, steadily wearing him down",
            "Soldier76": "Soldier76 has the sustained damage to chip away at Hazard and the mobility to kite him. Soldier can Sprint to maintain distance and use Biotic Field to outlast Hazard’s attempts at burst damage",
            "Mei": "Mei’s weapon and abilities counter Hazard’s close-range aggression – she can slow and potentially freeze Hazard with her primary fire, drop an Ice Wall to block his leaping engages or line of fire, and even cryo-freeze to avoid his ultimate",
            "Ana": "Ana can hit Hazard with a Biotic Grenade to prevent him from being healed and use Sleep Dart to stop his rampage mid-leap. Keeping Hazard at a distance with her darts significantly reduces his impact",
            "Lucio": "Lucio’s speed boost helps allies spread out to avoid Hazard’s area attacks, and his Sound Barrier provides extra shields to survive Hazard’s ultimate. Lucio can also boop Hazard away when he dives in, disrupting his combo attempts",
            "Zenyatta": "Zenyatta’s Discord Orb makes Hazard much easier to kill, and Zenyatta can stay at the edge of fights to minimize Hazard’s threat. Transcendence can also counteract the damage from Hazard’s **Downpour** ultimate, keeping the team alive through its immobilizing effect"
        }
    },
    {
        "name": "Junker Queen",
        "role": "tank",
        "counters": {
            "Orisa": "Orisa’s Fortify and defensive abilities blunt Junker Queen’s kit – she doesn’t get pulled by the Jagged Blade and can ignore the wound effects with her sheer durability. Orisa’s spear spin also mitigates Queen’s Scattergun damage output.  ",
            "Sigma": "Sigma outranges Junker Queen significantly. His shield and grasp deny Queen’s knives and gun shots, and Accretion can interrupt her Carnage swing or ultimate. Considering her low health pool (425), Queen is very vulnerable to Sigma’s focused damage",
            "Zarya": "Zarya’s bubbles cleanse Junker Queen’s wound effects (if timed right) and prevent her from landing the axe or Rampage on priority targets. Meanwhile, Zarya’s high-energy beam deals heavy damage to Queen, who lacks a barrier to block it.  ",
            "Reaper": "Reaper’s close-range dominance and life-steal let him go toe-to-toe with Junker Queen and win. Even if she uses Commanding Shout, Reaper can sustain through her damage while quickly depleting her health",
            "Ashe": "Ashe can fight Junker Queen from a safe mid-to-long range. Queen has no barrier, so Ashe can land powerful Viper shots and use Coach Gun to create distance if Queen tries to close in",
            "Widowmaker": "With Junker Queen’s relatively low HP for a tank, a skilled Widowmaker can eliminate her with a couple of charged headshots",
            "Ana": "Ana’s Biotic Grenade prevents Junker Queen from self-healing via Adrenaline Rush (from wounds), directly countering her survivability. Ana can also sleep Queen to halt an aggressive push or cancel the Rampage ultimate mid-charge",
            "Kiriko": "Kiriko is a direct counter to Junker Queen’s ultimate – Protection Suzu cleanses the anti-heal wound from Rampage, nullifying Queen’s big play. Kiriko can also keep her distance and pressure Queen with kunai, forcing Queen to waste Shout to engage.  ",
            "Zenyatta": "Zenyatta’s Discord Orb makes it easy for allies to burst down Junker Queen. Additionally, Zenyatta’s Transcendence can out-heal the wound damage from Queen’s Rampage (once the anti-heal fades or if Kiriko cleanses it), preventing her from securing kills.  "
        }
    },
    {
        "name": "Mauga",
        "role": "tank",
        "counters": {
            "Orisa": "Orisa’s staying power counters Mauga’s heavy damage. Her Fortify shrugs off Mauga’s knockbacks and prevents him from being easily focused, and she can spear Mauga to interrupt his momentum. Orisa’s consistent weapon damage also pressures Mauga despite his large health pool.  ",
            "Sigma": "Sigma can block Mauga’s chaingun barrage with his Experimental Barrier and return fire with Hyperspheres from a safe distance. If Mauga rushes in, Sigma’s Accretion rock can stun him, and Kinetic Grasp converts Mauga’s bullet damage into shields, nullifying Mauga’s offensive push.  ",
            "Reinhardt": "Reinhardt’s shield greatly reduces Mauga’s ranged threat, forcing Mauga into a hammer fight where Reinhardt excels. Mauga lacks a strong way to penetrate shields, so Reinhardt can protect his team and then hammer down Mauga at close range once Mauga’s abilities are on cooldown.  ",
            "Sombra": "Sombra is one of the best at disabling Mauga – her Hack stops Mauga from using his abilities (and any self-heal), preventing him from gaining durability or closing the gap. A hacked Mauga is left extremely vulnerable",
            "Widowmaker": "Widowmaker’s long-range precision punishes Mauga’s large frame. Mauga has no means to quickly close the gap on a far sniper, so Widowmaker can continuously pick at him or even land a crucial headshot without fear of reprisal",
            "Pharah": "Pharah can bombard Mauga from above, where his chainguns are less effective. Mauga has limited vertical mobility, so Pharah remains relatively safe and can use splash damage to wear him and his team down",
            "Ana": "Ana’s Biotic Grenade prevents Mauga from benefiting from any self-healing (and makes any incoming support healing useless), and Sleep Dart can temporarily take the giant tank out of the fight. Keeping Mauga “purple” (anti-healed) makes it far easier for the team to focus him down.  ",
            "Zenyatta": "Zenyatta’s Discord Orb is extremely effective against Mauga’s high health – with 25% increased damage taken, Mauga’s durability is significantly reduced. Zenyatta can stay at a distance and pepper Mauga with empowered shots, forcing Mauga to either retreat or take heavy damage.  ",
            "Lucio": "Lucio’s speed boost and mobility help his team avoid Mauga’s spike traps and heavy fire. Lucio can also boop Mauga, disrupting his attempts to lock targets down, and Sound Barrier provides enough team durability to survive Mauga’s combos and turn the tables.  "
        }
    },
    {
        "name": "Orisa",
        "role": "tank",
        "counters": {
            "Roadhog": "Roadhog’s Chain Hook can yank Orisa when Fortify is down, bypassing her defenses. If he times it when Orisa is vulnerable, he can deal massive damage to her before she retaliates, and Orisa’s large head makes her an easy target for Hog’s scrap-gun combo.  ",
            "Zarya": "Zarya can project a barrier onto whoever Orisa tries to javelin or spin, negating Orisa’s crowd control. Zarya’s beam also remains effective even if Orisa uses Fortify (since it isn’t blocked), continuously dealing damage until Orisa’s cooldowns are over.  ",
            "Sigma": "Sigma can play at a range Orisa cannot easily reach. His barrier blocks Orisa’s projectile shots, and he can hurl a Hypersphere or Accretion rock whenever Orisa drops her guard. If Orisa tries to use Terra Surge, Sigma can stun her out of it with Accretion to prevent the slam.  ",
            "Reaper": "Reaper’s close-range damage output can brute-force through Orisa’s defenses. Even with Fortify’s 40% damage reduction, Orisa’s large hitbox and Reaper’s life-steal mean he can sustain himself while shredding Orisa at point-blank range",
            "Sombra": "Sombra’s Hack disables Orisa’s Fortify and Javelin Spin, stripping Orisa of her survivability and crowd-control tools. A hacked Orisa can be focused down since she can’t block damage or prevent knockback",
            "Bastion": "Bastion’s Configuration: Assault (turret mode) rapidly destroys Orisa’s health despite Fortify. Orisa has no barrier, so Bastion can unload freely; Fortify won’t fully negate Bastion’s huge DPS and Orisa can’t close distance fast enough.  ",
            "Ana": "Ana’s Biotic Grenade can prevent Orisa from receiving healing while she’s under fire, making Orisa easier to kill despite her Fortify. Additionally, once Fortify ends, a Sleep Dart can leave Orisa defenseless, effectively removing her from the fight for a few seconds.  ",
            "Zenyatta": "Zenyatta’s Discord Orb significantly increases the damage Orisa takes, helping teammates break through her armor and Fortify. From a distance, Zenyatta can keep Orisa discorded and pelt her with orbs, exploiting Orisa’s slow movement when her abilities are on cooldown.  ",
            "Baptiste": "Baptiste’s Immortality Field can counter Orisa’s Terra Surge ultimate, preventing her from scoring kills after pulling everyone in. He also can fire from angles Orisa’s team might not block and amplify his team’s damage to break Orisa’s health bar quickly.  "
        }
    },
    {
        "name": "Ramattra",
        "role": "tank",
        "counters": {
            "Orisa": "Orisa can Fortify to avoid being slowed by Ramattra’s Ravenous Vortex and is immune to his punch knockback during Fortify. She can also interrupt Ramattra’s pummel with a well-timed javelin throw and generally outlasts his Nemesis form.  ",
            "Roadhog": "Roadhog can hook Ramattra when he drops his barrier or exits block, interrupting Ramattra’s approach. Hog’s high burst damage punishes Ramattra’s relatively large hitbox, especially if Ramattra isn’t in Nemesis form to block.  ",
            "Reinhardt": "Reinhardt’s shield can block Ramattra’s pokes and his Vortex for the team, forcing Ramattra into a close-range brawl where Reinhardt’s hammer and health pool give him an edge. If Ramattra enters Nemesis, Reinhardt can still trade blows and potentially Earthshatter when Ramattra’s block is down.  ",
            "Pharah": "Pharah can attack from high in the air, where Ramattra’s attacks (both staff and punches) cannot reach. Ramattra has to rely on his primary fire which is difficult to hit on a flying target, giving Pharah free reign to deal damage",
            "Mei": "Mei’s Endothermic Blaster slows Ramattra significantly, especially when he’s in Nemesis form trying to punch. She can also wall him off from his team or to cut off his escape, and even freeze him with Blizzard to stop an Annihilation push",
            "Reaper": "Reaper excels at the close-quarter fights Ramattra wants – except Reaper deals more burst damage. Reaper can phase out (Wraith Form) to avoid Ramattra’s punches or the damage from Annihilation, then return to quickly break Ramattra’s armor.  ",
            "Ana": "Ana’s Sleep Dart will immobilize Ramattra, especially if used when he’s in Nemesis form or during his Annihilation (sleeping him wastes precious seconds of his ult). Biotic Grenade also prevents his supports from healing him through the damage he takes while brawling",
            "Zenyatta": "Zenyatta’s Discord Orb makes Ramattra’s giant Nemesis form an easy target to focus down. Additionally, Transcendence can counter Ramattra’s Annihilation by out-healing its damage (though his ult timer won’t expire while Transcendence negates the damage, it prevents Ramattra from securing kills during its duration).  ",
            "Kiriko": "Kiriko’s Protection Suzu cleanses the slow effect from Ramattra’s Ravenous Vortex on allies and can briefly make allies invulnerable to stop the continuous damage of his ultimate. She can also teleport away from Ramattra’s punches and contribute damage from relative safety with her kunai.  "
        }
    },
    {
        "name": "Reinhardt",
        "role": "tank",
        "counters": {
            "Orisa": "Orisa doesn’t fear Reinhardt’s charge or Earthshatter as much due to Fortify’s CC immunity. She can poke at Reinhardt with her energy javelin and augment her defense with Javelin Spin, wearing Rein down as he struggles to close distance with his shield.  ",
            "Sigma": "Sigma can contest Reinhardt at mid-range, where Rein cannot easily hit him. Sigma’s barrier can block Fire Strikes and protect against a charge, and Accretion can punish Reinhardt if he drops his shield or attempts to rush in.  ",
            "Zarya": "Zarya can prevent Reinhardt’s big plays – Projected Barrier on a teammate negates Reinhardt’s pin or Earthshatter follow-up, and bubbles give Zarya high energy to melt Reinhardt’s shield and health. If Rein cannot land a shatter due to Zarya’s bubble coverage, he loses a major win condition.  ",
            "Pharah": "Pharah’s rockets bypass Reinhardt’s shield by arcing over or hitting around it, dealing splash damage to him and his team. Reinhardt has no reliable way to hit an airborne Pharah, allowing her to chip him down or pressure his supports",
            "Mei": "Mei can block Reinhardt’s charge or split him off from his team with Ice Wall. Her primary fire slows Reinhardt’s movement and swinging, making him an easier target, and if he’s caught in Blizzard he’s helpless. She also can Cryo-Freeze to avoid being hit by Earthshatter",
            "Bastion": "Bastion’s turret mode shreds Reinhardt’s shield in seconds and forces Rein to play extremely defensively. If Reinhardt tries to approach, Bastion’s high DPS can even break Rein himself before he closes distance",
            "Ana": "Ana can cancel Reinhardt’s momentum with Sleep Dart or stop his sustain with Biotic Grenade. A Nano-Boosted Reinhardt is also countered by Ana’s sleep – putting him down during his engage wastes the boost. Anti-nade plus focus fire will melt Reinhardt despite his shield.  ",
            "Kiriko": "Kiriko’s Protection Suzu is a hard counter to Reinhardt’s Earthshatter – it immediately cleanses the stun on her team, nullifying Rein’s biggest play. She can also Swift Step to allies out of reach if Reinhardt dives in and pepper him with kunai from outside his swing range.  ",
            "Lucio": "Lucio’s boop (Soundwave) knocks Reinhardt back, often disrupting a charge or preventing him from closing the gap. Moreover, Lucio’s Speed Boost helps his team kite Reinhardt, and Sound Barrier can neutralize the impact of Reinhardt’s Fire Strike or shatter engage by giving the team extra health.  "
        }
    },
    {
        "name": "Roadhog",
        "role": "tank",
        "counters": {
            "Orisa": "Orisa is highly resistant to Roadhog’s tricks. Fortify prevents her from being hooked, and even if Hog lands a hook when Fortify is down, Orisa’s large health and armor pool often let her survive the combo. Orisa can also interrupt Hog’s Take a Breather with Javelin Throw or mitigate his shots with Spin",
            "Zarya": "Zarya’s bubbles directly counter Roadhog’s hook combo – Projected Barrier makes a hooked ally temporarily invulnerable, nullifying Hog’s follow-up shot (while giving Zarya energy). Meanwhile, Zarya’s beam ignores Hog’s damage reduction during Breather and can burn through his large hitbox effectively",
            "Sigma": "Sigma can keep Roadhog at bay with his barrier, preventing hooks and blocking scrap shots. If Hog does land a hook on someone else, Sigma can use Kinetic Grasp or Accretion to peel – Accretion will cancel Hog’s Breather or Whole Hog if timed right, denying Hog his sustain or ultimate.  ",
            "Reaper": "Reaper is a brute-force counter to Roadhog. If Hog hooks Reaper, Wraith Form allows Reaper to escape, and outside of that Reaper’s shotguns deal extreme damage to Hog’s large body while self-healing. Reaper can often out-duel Hog even through Take a Breather.  ",
            "Sombra": "Sombra’s Hack shuts down Roadhog’s entire kit – a hacked Hog cannot use Take a Breather or Chain Hook. This leaves Hog without his sustain or pick potential, making him an ult battery. Sombra can also hack Hog during Whole Hog to cancel the ultimate prematurely.  ",
            "Mei": "Mei’s Endothermic Blaster slows Roadhog significantly, preventing him from lining up an accurate hook. If she lands several seconds of spray, she can even briefly freeze him, and her Ice Wall can block off Hog’s line of sight to his target. Hog’s large size also makes him an easy target for Mei’s icicle headshots once slowed.  ",
            "Ana": "Ana is the premier Roadhog counter – her Biotic Grenade prevents him from healing during Take a Breather and her Sleep Dart can interrupt Whole Hog or stop a flanking Hog in his tracks",
            "Zenyatta": "Zenyatta’s Discord Orb increases all damage Hog takes, helping allies cut through his 700 HP quickly. Zenyatta can stay far from Hog’s hook range and pelt him with charged shots – enough headshots with Discord can even force Hog to retreat before he finds a hook opportunity.  ",
            "Baptiste": "Baptiste’s Immortality Field can save allies from the brink of death if Roadhog hooks them, nullifying Hog’s combo. Baptiste can also use Regenerative Burst to counteract some of Hog’s area damage (from Whole Hog) and shoot Hog from off-angles using Exo Boots, making himself a difficult hook target.  "
        }
    },
    {
        "name": "Sigma",
        "role": "tank",
        "counters": {
            "Orisa": "Orisa’s Fortify makes her immune to Sigma’s Accretion stun, and she can push forward through Sigma’s barrier with Javelin Spin. Sigma struggles to break Orisa’s durable defenses and can be outpaced by her consistent damage and CC.  ",
            "D.Va": "D.Va can aggressively dive Sigma, rendering his long-range advantage moot. Defense Matrix eats Sigma’s Hyperspheres and even his Gravitic Flux slam if timed just as allies hit the ground. D.Va forces Sigma to duel at close range where she can overwhelm him.  ",
            "Zarya": "Zarya’s particle beam cannot be blocked by Sigma’s grasp or barrier once she gets within range. If Sigma tries to combo her with Accretion + primary fire, Zarya can use a personal bubble to absorb it, gaining energy and negating the damage. High-energy Zarya will quickly destroy Sigma’s barrier and pressure him heavily.  ",
            "Reaper": "Reaper can phase through Sigma’s barrier and unload point-blank. Sigma’s lack of mobility makes him an easy target for Reaper once distance is closed. Additionally, Sigma’s grasp won’t absorb Reaper’s hitscan pellets, so Reaper can continue to deal damage even when Sigma tries to defend",
            "Sombra": "Sombra can hack Sigma to drop his barrier and prevent him from using Kinetic Grasp, leaving him exposed. With his defenses down, Sigma is susceptible to being burst by Sombra’s team, and he cannot escape easily without abilities",
            "Pharah": "Pharah attacks from above and can stay out of reach of Sigma’s abilities. Sigma’s barrier can block some rockets but has limited duration, and Accretion is very hard to land on a flying Pharah. Meanwhile, Pharah’s sustained aerial assault pressures Sigma and forces him to spend resources on defense rather than aggression.  ",
            "Ana": "Ana’s Sleep Dart is particularly dangerous for Sigma – if she catches him (for example, while he’s channeling Gravitic Flux or dropping shield), it sets up an easy focus kill. Biotic Grenade also prevents Sigma from benefiting from his shield conversion (Kinetic Grasp shields) or support healing, making him much easier to bring down.  ",
            "Zenyatta": "Zenyatta’s Discord Orb makes quick work of Sigma’s health bar, especially since Sigma often holds still while using his abilities. Discord amplifies all damage, helping the team overwhelm Sigma’s shield and armor quickly",
            "Baptiste": "Baptiste’s Immortality Field thwarts Sigma’s Gravitic Flux kill combo – allies lifted by Flux can survive the slam with the field in place. Baptiste can also chip away at Sigma with his hitscan rifle and use Regenerative Burst to heal through Sigma’s poke damage, making Sigma’s job much harder.  "
        }
    },
    {
        "name": "Winston",
        "role": "tank",
        "counters": {
            "Roadhog": "Roadhog punishes Winston’s dives with Chain Hook – a hooked Winston is pulled out of his bubble and can be burst down with Scrap Gun. Hog’s high health and self-heal also allow him to withstand Winston’s Tesla Cannon long enough to win the duel or force Winston to retreat.  ",
            "Zarya": "Zarya thrives against Winston’s Tesla Cannon: her barriers soak up Winston’s lightning to charge her energy, making her attacks stronger. A high-energy Zarya will melt Winston quickly, and she can use bubbles on allies to nullify Winston’s focus fire when he jumps a target.  ",
            "Orisa": "Orisa can Fortify to ignore Winston’s knockback when he lands and can spear him away from squishy allies. Her sustained damage at mid-range pressures Winston outside the reach of his Tesla Cannon, and Javelin Spin can block the fire from his secondary if needed.  ",
            "Reaper": "Reaper’s shotguns make short work of Winston if he tries to engage Reaper or his team in close range. Winston’s Barrier won’t save him – Reaper can step inside it and continue firing. Meanwhile, Wraith Form lets Reaper escape if Winston tries to focus him with Primal Rage",
            "Bastion": "Bastion’s turret mode (Assault) can destroy Winston’s barrier and health rapidly. Winston has a large crit box and limited range, so if Bastion positions well, Winston will lose too much health before he ever reaches Bastion’s position",
            "Mei": "Mei can slow Winston with her Endothermic Blaster, making it difficult for him to escape once he dives in. She can also drop Ice Wall to block Winston’s escape route or isolate him from his team, and Cryo-Freeze to weather his Tesla Cannon until help arrives",
            "Brigitte": "Brigitte was designed to counter dive tanks like Winston. Her Inspire healing and armor make her team more survivable against Winston’s cleave damage, and Shield Bash or Whip Shot can interrupt Winston’s leap or push him away from priority targets, denying him easy kills.  ",
            "Ana": "Ana’s Sleep Dart is a direct threat to Winston – a sleeping Winston (often timed right after he lands or during Primal Rage) is a free elimination. Biotic Grenade also prevents Winston from getting healed while he’s in the fray, ensuring he can’t sustain a long dive.  ",
            "Moira": "Moira can evade Winston easily with Fade and out-heal his damage to her team. Her Biotic Grasp latches onto Winston when he dives, and Moira’s self-healing plus lifesteal orb can allow her to duel Winston if needed, often forcing him back without securing a kill.  "
        }
    },
    {
        "name": "WreckingBall",
        "role": "tank",
        "counters": {
            "Roadhog": "Roadhog’s Chain Hook is one of the best answers to a rolling Hammond – a hook can yank WreckingBall out of a rollout or pile drive, cancelling his momentum and leaving him exposed to follow-up shots. Hog’s high damage can then quickly deplete Ball’s health before he can escape.  ",
            "Orisa": "Orisa’s Fortify makes her immune to WreckingBall’s knockbacks and slams, denying Ball the ability to scatter her team. She can also spear Ball mid-roll to knock him back, and her Javelin Spin can block Ball’s Adaptive Shield projectile (limiting the shields he gains from nearby enemies).  ",
            "Ramattra": "Ramattra’s Ravenous Vortex is a direct counter to WreckingBall’s aerial pile drive – it pulls Ball down and significantly slows him, making him an easy target after he slams. In Nemesis form, Ramattra’s punches also go through Ball’s shields, pressuring him even if he uses Adaptive Shield.  ",
            "Sombra": "Sombra’s Hack is a hard counter to WreckingBall: a hacked Ball is knocked out of ball form and cannot use Grappling Claw or Adaptive Shield, leaving him extremely vulnerable. Sombra can then coordinate to burst Ball down during the hack duration",
            "Mei": "Mei’s freeze effects and Ice Wall ruin WreckingBall’s engagements. A well-placed Ice Wall can block Ball’s rollout paths or separate him from his tether point, and her primary fire can slow him to a crawl, stopping his escape. Once slowed, Ball becomes an easy target for her team",
            "Torbjorn": "Torbjorn’s turret automatically tracks WreckingBall, chipping away at him even as he tries to be evasive. The constant turret pressure forces Ball to deal with it or take continuous damage. Meanwhile, Torb’s Overload gives him the survivability to withstand Ball’s pile driver and shoot back effectively.  ",
            "Brigitte": "Brigitte’s Shield Bash will cancel WreckingBall’s rollout if timed as he approaches, and her Whip Shot can boop him away after a pile drive. Brigitte’s Repair Packs and Rally armor also counter Ball’s hit-and-run style by keeping her teammates sustained and resistant to his burst damage.  ",
            "Ana": "Ana’s Sleep Dart is a death sentence for WreckingBall – a sleeping Ball (especially after he’s used Adaptive Shield) can be quickly focused down by her team. Additionally, Ana’s Biotic Grenade prevents Ball from receiving healing from his supports, so if he dives in and gets anti-healed, he cannot sustain and must retreat or die.  ",
            "Zenyatta": "While Zenyatta is a dive target for Ball, a coordinated team can make use of Discord Orb to kill WreckingBall quickly. The orb stays on Ball even as he rolls around, increasing all damage he takes. If Ball can’t remove the discord (by breaking line of sight), Zen’s team will burst him down and punish his aggression"
        }
    },
    {
        "name": "Zarya",
        "role": "tank",
        "counters": {
            "Sigma": "Sigma’s range and shield control can stymie Zarya. He can poke safely with Hyperspheres and pull back behind his barrier whenever Zarya looks to beam him. If Zarya uses her Projected Barrier aggressively, Sigma can wait it out or use Kinetic Grasp to avoid feeding her energy. Accretion can also interrupt a high-energy Zarya’s Graviton Surge if timed perfectly.  ",
            "Orisa": "Orisa’s Javelin Spin eats Zarya’s secondary fire grenades, and Fortify prevents her from being pulled by Graviton Surge. Orisa can also outlast Zarya’s damage thanks to her armor and Fortify damage reduction, especially when Zarya doesn’t have bubbles available.  ",
            "Roadhog": "Roadhog can capitalize when Zarya’s bubbles are on cooldown. If he hooks her when she’s vulnerable, he can take out a significant chunk of her health with his follow-up combo. Additionally, Roadhog’s frequent self-healing forces Zarya to expend a lot of effort and energy to secure a kill, during which time Hog can look for another hook opportunity.  ",
            "Bastion": "Bastion’s high sustained DPS in turret mode can burn through Zarya’s health even if she has high energy. Her bubbles last only 2 seconds and can’t cover her whole team, so Bastion will always find targets to shoot. Once her bubbles are down, Zarya herself can be shredded quickly by Bastion’s fire",
            "Reaper": "Reaper can exploit Zarya’s shorter range. If he teleports or flanks into range, his shotguns will deal heavy damage faster than Zarya can charge up and return it. If Zarya bubbles, Reaper can simply cease fire momentarily to avoid feeding her, then resume once it expires, often out-dueling her at close range.  ",
            "Pharah": "Pharah can stay well outside of Zarya’s effective range and bombard her. Zarya has no tools to reliably hit an airborne target at long range except slow lobbed grenades, which are easy for Pharah to dodge. This means Pharah can freely pressure Zarya or her teammates and force Zarya to use bubbles to save allies from splash damage",
            "Ana": "Ana’s Biotic Grenade is extremely potent against Zarya because it prevents Zarya from receiving any healing during its duration, making Zarya easier to kill despite her shields. Also, Ana’s Sleep Dart can neutralize Zarya’s Graviton Surge combo by sleeping Zarya or her follow-up damage dealer during the ultimate.  ",
            "Zenyatta": "Zenyatta’s Discord Orb ensures Zarya takes amplified damage even while she might have bubble protection. Since Discord persists until line of sight is broken, Zarya remains a glowing target anytime she’s in the open, and the extra damage helps overcome her shield health quickly.  ",
            "Kiriko": "Kiriko’s Protection Suzu can cleanse the Graviton Surge effect from her teammates, allowing them to escape Zarya’s ultimate. This completely nullifies Zarya’s biggest playmaker. In neutral play, Kiriko can also Swift Step away if Zarya tries to focus her, and her kunai can poke Zarya from outside of optimal beam range, keeping Kiriko relatively safe while still contributing to the fight.    "
        }
    }
]


const heroesThatCounter = (heroName, myRole) => {
  const role = roles.find(r => r.alias.includes(myRole.toLowerCase()));

  if (!role) {
    return `Invalid role.`;
  }


  const counters = data.filter(h => Object.keys(h.counters).find(c => c.toLowerCase() === heroName.toLowerCase()) && h.role === role.id)



  if (!counters.length) {
    return `I don't have any counters for ${heroName}.`;
  }


  const counterHeroes = counters.map(c => c.name).join(', ');

  return counterHeroes;


}



/**
 * @param {import("@nerimity/nerimity.js/build/Client.js").Message} message
 */
export const run = async (bot, args, message) => {
  const argsWithoutFirst = args.slice(1);


  const counters = heroesThatCounter(argsWithoutFirst[0], argsWithoutFirst[1]);

  message.channel.send(counters);
};
