import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface BlogPost {
  id: number;
  category: string;
  title: string;
  date: string;
  image: string;
}

export interface Job {
  id: number;
  title: string;
  type: string;
  description: string;
}

export interface Partner {
  name: string;
  logoText: string;
}