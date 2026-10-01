# -*- coding: utf-8 -*-
"""
High-quality English Subtitles (textEn) for World Time Documentary:
"Vì sao cả thế giới vẫn mô tả được cùng một thời điểm?" (world-time-documentary)
Total: 64 sentences across 10 chapters.
Style: Scientific and historical explainer (Vox-style documentary).
"""
import json
import sys
from pathlib import Path

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

WORLD_TIME_PERFECT_EN = {
    "part1": [
        "Right now, it might be evening in Vietnam, afternoon in Europe, and morning in the United States, yet all of those clocks can accurately describe the exact same instant.",
        "The surprising truth is that humanity unified time not by forcing every clock to show the same number, but by establishing a single common reference from which each region derives its local time.",
        "Yet for most of human history, there was no such thing as 'world time'.",
        "Each town simply observed the Sun: when it reached its highest point in the sky, people called that midday.",
        "Earth rotates 360 degrees in about 24 hours, or roughly 15 degrees per hour, meaning traveling just one degree of longitude east or west shifts local solar time by about four minutes.",
        "As a result, two cities a few hundred kilometers apart east-to-west could easily experience '12 noon' at entirely different moments.",
        "When humans primarily traveled on foot, on horseback, or by slow sailing boats, a few minutes' difference between towns posed virtually no problem.",
        "Everything truly changed only when people began moving and transmitting information faster than their own local time systems."
    ],
    "part2": [
        "Even before railways, another industry forced humanity to care about precise time: navigation at sea.",
        "On the open ocean, finding latitude was relatively straightforward using celestial bodies, but determining longitude required sailors to know both their local time and the time at a reference meridian simultaneously.",
        "If local time differed by one hour from the reference clock, the vessel was roughly 15 degrees of longitude away from that reference line.",
        "That was a primary reason the Royal Observatory at Greenwich was founded in 1675: to improve astronomy in service of maritime navigation.",
        "By 1767, the first Nautical Almanac was published under Astronomer Royal Nevil Maskelyne, providing celestial tables for pinpointing positions across the ocean.",
        "Over decades, Greenwich became an increasingly familiar baseline for navigators, astronomers, and cartographers.",
        "In 1833, a time ball was installed atop Greenwich; at precisely 1:00 PM it dropped so sailors on the River Thames could calibrate their marine chronometers.",
        "Time began transforming from a personal observation of the sky into a signal generated in one place and distributed to others."
    ],
    "part3": [
        "Then railways arrived, and differences of mere minutes suddenly became a critical hazard.",
        "A passenger traveling between cities could now arrive in just a few hours, while clocks at each station ran on independent local solar times.",
        "For railroad companies, dozens of disparate local times meant tangled timetables, confused passengers, and serious operational risks.",
        "In the early 1840s, Britain's Great Western Railway began adopting London time—Greenwich time—across its entire network instead of individual town times.",
        "Other railway lines gradually followed, because a train can only run safely if the engineer, the stationmaster, and the passengers all share the same understanding of time.",
        "At the same time, the electric telegraph allowed time signals to travel hundreds of kilometers almost instantaneously.",
        "Starting in 1852, Greenwich transmitted time signals via telegraph, and in subsequent decades this signal spread widely across Britain's railway and postal networks.",
        "This marked a historic turning point: time no longer belonged solely to the sky above each town; it was becoming a national infrastructure."
    ],
    "part4": [
        "In North America, the situation was even more chaotic: before 1883 there were hundreds of local times, and railroad companies juggled roughly fifty distinct regional standards.",
        "In 1881, the railroad industry tasked William Frederick Allen with devising a simpler, unified system.",
        "The solution was grouping local times into broad geographic zones, with standard meridians spaced 15 degrees apart, corresponding to one hour.",
        "On November 18, 1883, the vast majority of US and Canadian railroads switched to Standard Railway Time.",
        "Numerous cities swiftly adopted the new system as commerce, transportation, and communication became immensely simpler.",
        "Not everyone welcomed the change; some viewed standard time as railroads and big cities stripping local communities of their autonomy.",
        "During this era, Canadian engineer Sandford Fleming actively campaigned for a global system of 24 time zones and a universal 24-hour day.",
        "Yet it would be inaccurate to claim a single person 'invented time zones'; our modern system was forged through decades of collaboration among astronomers, engineers, railroads, governments, and international conferences."
    ],
    "part5": [
        "A year later, in 1884, 41 delegates representing 25 nations gathered in Washington, D.C. to resolve a larger issue: humanity needed a shared prime meridian.",
        "Previously, nations often used disparate prime meridians on their maps, usually passing through their own capitals or national observatories.",
        "Greenwich held a decisive advantage: navigational charts and maritime data based on the Greenwich meridian were already widely used across international shipping.",
        "The conference ultimately selected the meridian passing through Greenwich as the Prime Meridian, proposing a universal day commencing at Greenwich mean midnight, counted from 0 to 24 hours.",
        "Yet here is a detail frequently misconstrued: the 1884 conference never mandated that every nation divide its territory into 24 civil time zones.",
        "Nations subsequently adopted their own civil standard times independently, typically chosen as integer hour offsets from Greenwich Mean Time.",
        "Because civil time is human-regulated, time zone boundaries do not follow perfectly straight meridians, but curve around national borders, economic ties, and political choices.",
        "The most vital achievement was not making every clock look identical, but establishing a universal language allowing every local time to map back to a single reference."
    ],
    "part6": [
        "The Greenwich-based system solved international coordination, yet a fundamental physical challenge remained: Earth does not rotate at a perfectly uniform rate.",
        "Astronomical day length fluctuates minutely due to geophysical processes within Earth, meaning for ultra-high precision, planetary motion is no longer a sufficiently stable clock.",
        "By the mid-20th century, atomic clocks demonstrated that quantum transitions in atoms provide a far more stable beat than the rotation of Earth.",
        "In 1967, the SI second was officially defined as 9,192,631,770 periods of radiation corresponding to the hyperfine transition of the cesium-133 atom.",
        "From that point forward, the fundamental unit of time was no longer measured by counting Earth's physical rotations.",
        "Today, International Atomic Time (TAI) is calculated by the BIPM from an extensive worldwide network of atomic clocks and frequency standards.",
        "Coordinated Universal Time (UTC) ticks at the exact same rate as TAI, but is offset from TAI by an integer number of seconds to preserve harmony with astronomical time.",
        "Most modern civil time can simply be understood as UTC plus or minus an offset decreed by local authorities."
    ],
    "part7": [
        "Yet the world still wants clock noon not to drift too far from the Sun's physical zenith, so UTC is continually compared against UT1, a timescale reflecting Earth's actual rotation.",
        "Under the current system, whenever the divergence between UT1 and UTC approaches 0.9 seconds, a leap second may be inserted into UTC.",
        "Since 1972, 27 positive leap seconds have been added; the most recent occurred at the end of 2016, leaving TAI currently 37 seconds ahead of UTC.",
        "This tiny adjustment is imperceptible to humans, yet for computers, telecommunications networks, and high-frequency financial trading, an irregular second can cause serious disruptions.",
        "And UTC is not a single clock locked inside some secret vault.",
        "National metrology institutes maintain real-time physical realizations called UTC(k), comparing data with the BIPM to keep global standards synchronized with extraordinary precision.",
        "In the skies, every GPS satellite carries multiple atomic clocks, beaming hyper-precise time signals down to Earth.",
        "From laboratories and satellites, standard time flows through servers, telecom networks, and the Internet before the phone in your pocket converts it into your local time."
    ],
    "part8": [
        "UTC provides only the foundational baseline; atop it sit civil time laws enacted by each nation: UTC offsets, daylight saving time, and occasional political or economic shifts.",
        "That is why real-world time zone maps are not 24 neat vertical stripes, and why some regions utilize half-hour or 45-minute offsets instead of whole hours.",
        "To help computers navigate these intricate rules, the IANA Time Zone Database archives the history and transitions of local civil times worldwide.",
        "Whenever a government alters its time zone or adjusts daylight saving rules, operating systems update that database so millions of smartphones adjust automatically."
    ],
    "part9": [
        "Leap seconds were once a clever compromise between a flawless atomic clock and an imperfectly spinning Earth, but unexpected step-seconds increasingly strain digital infrastructure.",
        "In 2022, international metrology authorities resolved to relax the maximum allowed tolerance between UTC and UT1 by or before 2035, allowing UTC to run continuously for decades without frequent leap seconds."
    ],
    "part10": [
        "Thus, the answer to 'why we measure time the same way across the globe' is simple: we do not use the same hour on the clock face; we share the exact same second and the exact same temporal reference.",
        "From sundial shadows on an ancient village square, ocean-crossing caravels, steam train whistles, and telegraph wires, to the Greenwich conference, cesium atoms, GPS satellites, and the smartphone in your palm, it took centuries for humanity to transform time from an isolated local experience into a universal language shared by the entire planet."
    ]
}

if __name__ == "__main__":
    total = sum(len(v) for v in WORLD_TIME_PERFECT_EN.values())
    print(f"Verified World Time translations: {total}/64 sentences across {len(WORLD_TIME_PERFECT_EN)} chapters.")
    out_file = Path("src/data/world_time_translations_en.json")
    out_file.write_text(json.dumps(WORLD_TIME_PERFECT_EN, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Saved: {out_file}")
