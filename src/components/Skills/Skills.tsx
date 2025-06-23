import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const skills = [
    { name: "HTML", value: 95 },
    { name: "CSS", value: 90 },
    { name: "JavaScript", value: 90 },
    { name: "TypeScript", value: 80 },
    { name: "React.js", value: 90 },
    { name: "Next.js", value: 80 },
    { name: "Node.js", value: 85 },
    { name: "Express.js", value: 85 },
    { name: "MongoDB", value: 80 },
    { name: "Firebase", value: 70 },
    { name: "Redux", value: 80 },
    { name: "RESTAPI", value: 85 },
    { name: "GraphQL", value: 60 },
    { name: "Tailwind CSS", value: 85 },
    { name: "Git & GitHub", value: 90 },
    { name: "Docker", value: 50 },
];

const maxValue = 100;
const size = 400;
const center = size / 2;
const radius = size / 2 - 50;

const getPoint = (angle: number, value: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    const r = (value / maxValue) * radius;
    return {
        x: center + r * Math.cos(rad),
        y: center + r * Math.sin(rad),
    };
};

const Skills: React.FC = () => {
    const [hovered, setHovered] = useState<number | null>(null);
    const [polygonDraw, setPolygonDraw] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setTimeout(() => setPolygonDraw(true), 300);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setTilt({ x: y * 10, y: -x * 10 });
    };
    const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

    const points = skills.map((skill, i) => {
        const angle = (360 / skills.length) * i;
        return getPoint(angle, polygonDraw ? skill.value : 0);
    });
    const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ");

    return (
        <div className="flex flex-col items-center py-10 bg-gradient-to-br from-slate-800 via-slate-900 to-black">
            <h2 className="text-4xl sm:text-5xl font-bold text-cyan-400 mb-10 tracking-wide uppercase">
                My Skills
            </h2>
            <div
                ref={cardRef}
                className="relative w-[90vw] max-w-[500px] p-3 bg-slate-950/40 backdrop-blur-lg  aspect-square rounded-2xl border border-cyan-400/20 shadow-xl"
                style={{
                    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transition: "transform 0.2s ease-out",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
                    <defs>
                        <radialGradient id="circle-bg" cx="50%" cy="50%" r="60%">
                            <stop offset="0%" stopColor="#0f172a" />
                            <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                    </defs>

                    <circle cx={center} cy={center} r={radius + 30} fill="url(#circle-bg)" />

                    {[0.25, 0.5, 0.75, 1].map((f, i) => (
                        <circle
                            key={i}
                            cx={center}
                            cy={center}
                            r={radius * f}
                            stroke="#334155"
                            strokeWidth={1}
                            fill="none"
                        />
                    ))}

                    {skills&& skills?.map((_, i) => {
                        const angle = (360 / skills?.length) * i;
                        const { x, y } = getPoint(angle, maxValue);
                        return (
                            <line
                                key={i}
                                x1={center}
                                y1={center}
                                x2={x}
                                y2={y}
                                stroke="#475569"
                                strokeWidth={1}
                            />
                        );
                    })}

                    <polygon
                        points={polygonPoints}
                        fill="rgba(34,211,238,0.3)"
                        stroke="#22d3ee"
                        strokeWidth={2.5}
                    />

                    {points.map((p, i) => (
                        <circle
                            key={i}
                            cx={p.x}
                            cy={p.y}
                            r={hovered === i ? 8 : 5}
                            fill="#22d3ee"
                            stroke="#e0f2fe"
                            strokeWidth={2}
                            onMouseOver={() => setHovered(i)}
                            onMouseOut={() => setHovered(null)}
                        />
                    ))}

                    { skills && skills?.map((skill, i) => {
                        const angle = (360 / skills.length) * i;
                        const { x, y } = getPoint(angle, maxValue + 20);
                        return (
                            <Link key={i} to={`/skills/${skill?.name}`}><text
                                key={i}
                                x={x}
                                y={y}
                                textAnchor="middle"
                                fill="#e2e8f0"
                                fontSize={12}
                                fontFamily="sans-serif"
                            >
                                {skill?.name}
                            </text></Link>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
};

export { skills };
export default Skills;