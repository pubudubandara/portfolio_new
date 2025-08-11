import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Skill from '@/models/Skill';

export async function POST() {
  try {
    await connectDB();

    // Define the 4 fixed skill categories
    const defaultSkills = [
      {
        category: "Programming Languages",
        skills: ["C", "Java", "JavaScript", "TypeScript"],
        icon: "Code"
      },
      {
        category: "Web Development", 
        skills: ["HTML", "CSS", "Next.js", "React", "Node.js", "Express.js", "Tailwind CSS"],
        icon: "Globe"
      },
      {
        category: "Database",
        skills: ["MongoDB", "MySQL"],
        icon: "Database"
      },
      {
        category: "Other",
        skills: ["Git", "Photoshop", "Figma", "Docker"],
        icon: "Box"
      }
    ];

    // Clear existing skills and insert default ones
    await Skill.deleteMany({});
    const insertedSkills = await Skill.insertMany(defaultSkills);

    return NextResponse.json({ 
      success: true, 
      message: 'Default skill categories initialized successfully',
      data: insertedSkills
    });

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
