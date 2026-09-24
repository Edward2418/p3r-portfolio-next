interface Profile {
  name: string
  displayName: string
  initials: string
  degree: string
  institution: string
  specialty: string
  academic: {
    currentSemester: number
    completedSemesters: number
    totalSemesters: number
    graduationYear: number
  }
}

export const PROFILE = {
  name: 'Edward Negrete Bustos',
  displayName: 'EDWARD',
  initials: 'ED',
  degree: 'Ingeniería en Sistemas Computacionales',
  institution: 'TecNM · ITSH · Huauchinango, Pue.',
  specialty: 'Full-Stack y Videojuegos',
  academic: {
    currentSemester: 6,
    completedSemesters: 5,
    totalSemesters: 8,
    graduationYear: 2027,
  },
} satisfies Profile

export const ACADEMIC_PROGRESS = PROFILE.academic.completedSemesters / PROFILE.academic.totalSemesters * 100
export const PLAYER_LEVEL = String(PROFILE.academic.currentSemester).padStart(2, '0')

// Estadísticas decorativas del personaje, independientes del progreso académico.
export const PLAYER_STATS = [
  { label: 'HP', value: 425, max: 500, variant: 'hp' },
  { label: 'SP', value: 182, max: 300, variant: 'sp' },
] as const
