import React from 'react';
import { ColorSwatch } from '../components/design-system/ColorSwatch';
import { ContrastChecker } from '../components/design-system/ContrastChecker';
import { ArrowLeftIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
export function DesignSystem() {
  const primaryColors = [
  {
    name: '25',
    variable: '--color-primary-25',
    hex: '#F5F7FF'
  },
  {
    name: '50',
    variable: '--color-primary-50',
    hex: '#EBF0FF'
  },
  {
    name: '100',
    variable: '--color-primary-100',
    hex: '#D6E0FF'
  },
  {
    name: '200',
    variable: '--color-primary-200',
    hex: '#ADC2FF'
  },
  {
    name: '300',
    variable: '--color-primary-300',
    hex: '#85A3FF'
  },
  {
    name: '400',
    variable: '--color-primary-400',
    hex: '#5C85FF'
  },
  {
    name: '500',
    variable: '--color-primary-500',
    hex: '#0A1F8F'
  },
  {
    name: '600',
    variable: '--color-primary-600',
    hex: '#081975'
  },
  {
    name: '700',
    variable: '--color-primary-700',
    hex: '#06125C'
  },
  {
    name: '800',
    variable: '--color-primary-800',
    hex: '#040C42'
  },
  {
    name: '900',
    variable: '--color-primary-900',
    hex: '#020629'
  }];

  const secondaryColors = [
  {
    name: '25',
    variable: '--color-secondary-25',
    hex: '#F8FCFE'
  },
  {
    name: '50',
    variable: '--color-secondary-50',
    hex: '#F3F9FD'
  },
  {
    name: '100',
    variable: '--color-secondary-100',
    hex: '#E1F0FB'
  },
  {
    name: '200',
    variable: '--color-secondary-200',
    hex: '#D2E8F8'
  },
  {
    name: '300',
    variable: '--color-secondary-300',
    hex: '#A5D0F1'
  },
  {
    name: '400',
    variable: '--color-secondary-400',
    hex: '#78B9EA'
  },
  {
    name: '500',
    variable: '--color-secondary-500',
    hex: '#1E8ADC'
  },
  {
    name: '600',
    variable: '--color-secondary-600',
    hex: '#186EB0'
  },
  {
    name: '700',
    variable: '--color-secondary-700',
    hex: '#125384'
  },
  {
    name: '800',
    variable: '--color-secondary-800',
    hex: '#0C3758'
  },
  {
    name: '900',
    variable: '--color-secondary-900',
    hex: '#061C2C'
  }];

  const neutralColors = [
  {
    name: '25',
    variable: '--color-neutral-25',
    hex: '#FCFCFC'
  },
  {
    name: '50',
    variable: '--color-neutral-50',
    hex: '#F6F6F6'
  },
  {
    name: '100',
    variable: '--color-neutral-100',
    hex: '#EFEFEF'
  },
  {
    name: '200',
    variable: '--color-neutral-200',
    hex: '#E0E0E0'
  },
  {
    name: '300',
    variable: '--color-neutral-300',
    hex: '#C2C2C2'
  },
  {
    name: '400',
    variable: '--color-neutral-400',
    hex: '#A3A3A3'
  },
  {
    name: '500',
    variable: '--color-neutral-500',
    hex: '#676767'
  },
  {
    name: '600',
    variable: '--color-neutral-600',
    hex: '#282828'
  },
  {
    name: '700',
    variable: '--color-neutral-700',
    hex: '#1A1A1A'
  },
  {
    name: '800',
    variable: '--color-neutral-800',
    hex: '#0A0A0A'
  },
  {
    name: '900',
    variable: '--color-neutral-900',
    hex: '#050505'
  }];

  const semanticColors = [
  {
    name: 'Error',
    variable: '--color-error-500',
    hex: '#EF4444'
  },
  {
    name: 'Warning',
    variable: '--color-warning-500',
    hex: '#F59E0B'
  },
  {
    name: 'Success',
    variable: '--color-success-500',
    hex: '#10B981'
  }];

  const whiteColors = [
  {
    name: 'White',
    variable: '--color-white',
    hex: '#FFFFFF'
  },
  {
    name: 'Ice White',
    variable: '--color-ice-white',
    hex: '#FCFCFD'
  }];

  const supportingColors = [
  {
    name: 'Plum',
    variable: '--color-plum-500',
    hex: '#8D477C'
  }];

  return (
    <div className="min-h-screen bg-neutral-25 font-sans text-neutral-800">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="p-2 hover:bg-neutral-50 rounded-full transition-colors text-neutral-500 hover:text-neutral-900">
              
              <ArrowLeftIcon size={20} />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-neutral-900">
                Colour Foundation
              </h1>
              <p className="text-sm text-neutral-500">
                System documentation v1.0
              </p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-neutral-600">
            <a
              href="#primary"
              className="hover:text-primary-500 transition-colors">
              
              Primary
            </a>
            <a
              href="#secondary"
              className="hover:text-primary-500 transition-colors">
              
              Secondary
            </a>
            <a
              href="#neutral"
              className="hover:text-primary-500 transition-colors">
              
              Neutral
            </a>
            <a
              href="#semantic"
              className="hover:text-primary-500 transition-colors">
              
              Semantic
            </a>
            <a
              href="#accessibility"
              className="hover:text-primary-500 transition-colors">
              
              Accessibility
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-20">
        {/* Intro */}
        <section className="max-w-3xl">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">Overview</h2>
          <p className="text-lg text-neutral-600 leading-relaxed mb-4">
            Our color system is built on a foundation of accessibility and
            flexibility. We use abstract naming conventions (Primary, Secondary,
            Neutral) to ensure the system remains resilient to future
            rebranding.
          </p>
          <div className="flex gap-4 mt-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-success-500"></span>
              <span className="text-sm text-neutral-600">
                WCAG 2.2 AA Compliant
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary-500"></span>
              <span className="text-sm text-neutral-600">
                Themable via CSS Variables
              </span>
            </div>
          </div>
        </section>

        {/* Primary Palette */}
        <section id="primary" className="scroll-mt-24">
          <div className="flex items-baseline justify-between mb-8 border-b border-neutral-200 pb-4">
            <div>
              <h3 className="text-2xl font-bold text-neutral-900">
                Primary Palette
              </h3>
              <p className="text-neutral-500 mt-1">
                Cobalt Blue • Brand Identity & Action
              </p>
            </div>
            <code className="text-xs bg-neutral-100 px-2 py-1 rounded text-neutral-600">
              --color-primary-*
            </code>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {primaryColors.map((color) =>
            <ColorSwatch key={color.name} {...color} />
            )}
          </div>

          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <h4 className="font-semibold text-neutral-900 mb-4">
              Usage Guidelines
            </h4>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h5 className="text-sm font-medium text-success-700 mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-success-500"></span>{' '}
                  Do
                </h5>
                <ul className="space-y-2 text-sm text-neutral-600 list-disc list-inside">
                  <li>
                    Use <strong>Primary 500</strong> for main navigation
                    backgrounds
                  </li>
                  <li>
                    Use <strong>Primary 500</strong> for primary call-to-action
                    buttons
                  </li>
                  <li>
                    Use <strong>Primary 600/700</strong> for hover states
                  </li>
                  <li>
                    Use <strong>Primary 50-100</strong> for subtle backgrounds
                    in active states
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="text-sm font-medium text-error-700 mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-error-500"></span>{' '}
                  Don't
                </h5>
                <ul className="space-y-2 text-sm text-neutral-600 list-disc list-inside">
                  <li>Don't use for destructive actions (use Error)</li>
                  <li>Don't use for body text (use Neutral)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary Palette */}
        <section id="secondary" className="scroll-mt-24">
          <div className="flex items-baseline justify-between mb-8 border-b border-neutral-200 pb-4">
            <div>
              <h3 className="text-2xl font-bold text-neutral-900">
                Secondary Palette
              </h3>
              <p className="text-neutral-500 mt-1">
                Sky Blue • Decoration & Accents
              </p>
            </div>
            <code className="text-xs bg-neutral-100 px-2 py-1 rounded text-neutral-600">
              --color-secondary-*
            </code>
          </div>

          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 mb-8 flex items-start gap-3">
            <span className="text-warning-600 mt-0.5">⚠️</span>
            <div>
              <h4 className="text-sm font-bold text-warning-800">
                Usage Constraint
              </h4>
              <p className="text-sm text-warning-700 mt-1">
                Never use Secondary colors for text content. These shades are
                reserved for decorative elements, icons, and background states
                only.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {secondaryColors.map((color) =>
            <ColorSwatch key={color.name} {...color} />
            )}
          </div>
        </section>

        {/* Neutral Palette */}
        <section id="neutral" className="scroll-mt-24">
          <div className="flex items-baseline justify-between mb-8 border-b border-neutral-200 pb-4">
            <div>
              <h3 className="text-2xl font-bold text-neutral-900">
                Neutral Palette
              </h3>
              <p className="text-neutral-500 mt-1">
                Stone Grey • Structure & Typography
              </p>
            </div>
            <code className="text-xs bg-neutral-100 px-2 py-1 rounded text-neutral-600">
              --color-neutral-*
            </code>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {neutralColors.map((color) =>
            <ColorSwatch key={color.name} {...color} />
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-neutral-200 rounded-xl p-6">
              <h4 className="font-semibold text-neutral-900 mb-4">
                Typography Mapping
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">Headings</span>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-neutral-900 rounded border border-neutral-200"></span>
                    <code className="text-xs text-neutral-700">
                      Neutral 900
                    </code>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">Body Text</span>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-neutral-700 rounded border border-neutral-200"></span>
                    <code className="text-xs text-neutral-700">
                      Neutral 700
                    </code>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">
                    Subtitles / Hints
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-neutral-500 rounded border border-neutral-200"></span>
                    <code className="text-xs text-neutral-700">
                      Neutral 500
                    </code>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white border border-neutral-200 rounded-xl p-6">
              <h4 className="font-semibold text-neutral-900 mb-4">
                Structure Mapping
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">
                    Page Background
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-neutral-25 rounded border border-neutral-200"></span>
                    <code className="text-xs text-neutral-700">Neutral 25</code>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500">
                    Borders / Dividers
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-neutral-200 rounded border border-neutral-200"></span>
                    <code className="text-xs text-neutral-700">
                      Neutral 200
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Whites & Supporting */}
        <section className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold text-neutral-900 mb-6">Whites</h3>
            <div className="grid grid-cols-2 gap-4">
              {whiteColors.map((color) =>
              <ColorSwatch key={color.name} {...color} />
              )}
            </div>
            <p className="text-sm text-neutral-500 mt-4">
              Use <strong>Ice White</strong> for containers to subtly
              differentiate from the main <strong>White</strong> background.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-neutral-900 mb-6">
              Supporting
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {supportingColors.map((color) =>
              <ColorSwatch key={color.name} {...color} />
              )}
            </div>
          </div>
        </section>

        {/* Semantic Palette */}
        <section id="semantic" className="scroll-mt-24">
          <div className="flex items-baseline justify-between mb-8 border-b border-neutral-200 pb-4">
            <div>
              <h3 className="text-2xl font-bold text-neutral-900">
                Semantic Palette
              </h3>
              <p className="text-neutral-500 mt-1">Feedback & States</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Error */}
            <div className="space-y-4">
              <h4 className="font-semibold text-error-700">Error</h4>
              <div className="grid gap-2">
                <ColorSwatch
                  name="500"
                  variable="--color-error-500"
                  hex="#EF4444" />
                
                <ColorSwatch
                  name="50"
                  variable="--color-error-50"
                  hex="#FEF2F2" />
                
              </div>
              <p className="text-xs text-neutral-500">
                Used for critical errors, destructive actions, and validation
                failures.
              </p>
            </div>

            {/* Warning */}
            <div className="space-y-4">
              <h4 className="font-semibold text-warning-700">Warning</h4>
              <div className="grid gap-2">
                <ColorSwatch
                  name="500"
                  variable="--color-warning-500"
                  hex="#F59E0B" />
                
                <ColorSwatch
                  name="50"
                  variable="--color-warning-50"
                  hex="#FFFBEB" />
                
              </div>
              <p className="text-xs text-neutral-500">
                Used for non-critical warnings, attention needed, and pending
                states.
              </p>
            </div>

            {/* Success */}
            <div className="space-y-4">
              <h4 className="font-semibold text-success-700">Success</h4>
              <div className="grid gap-2">
                <ColorSwatch
                  name="500"
                  variable="--color-success-500"
                  hex="#10B981" />
                
                <ColorSwatch
                  name="50"
                  variable="--color-success-50"
                  hex="#ECFDF5" />
                
              </div>
              <p className="text-xs text-neutral-500">
                Used for completion, valid states, and positive feedback.
              </p>
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section id="accessibility" className="scroll-mt-24">
          <div className="flex items-baseline justify-between mb-8 border-b border-neutral-200 pb-4">
            <div>
              <h3 className="text-2xl font-bold text-neutral-900">
                Accessibility Matrix
              </h3>
              <p className="text-neutral-500 mt-1">
                WCAG 2.2 AA Compliance Check
              </p>
            </div>
          </div>

          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
            <ContrastChecker
              backgrounds={[
              {
                name: 'White',
                hex: '#FFFFFF',
                variable: '--color-white'
              },
              {
                name: 'Neutral 50',
                hex: '#F6F6F6',
                variable: '--color-neutral-50'
              },
              {
                name: 'Primary 50',
                hex: '#EBF0FF',
                variable: '--color-primary-50'
              },
              {
                name: 'Primary 500',
                hex: '#0A1F8F',
                variable: '--color-primary-500'
              },
              {
                name: 'Neutral 900',
                hex: '#050505',
                variable: '--color-neutral-900'
              }]
              }
              foregrounds={[
              {
                name: 'Neutral 900',
                hex: '#050505',
                variable: '--color-neutral-900'
              },
              {
                name: 'Neutral 700',
                hex: '#1A1A1A',
                variable: '--color-neutral-700'
              },
              {
                name: 'Neutral 500',
                hex: '#676767',
                variable: '--color-neutral-500'
              },
              {
                name: 'Primary 500',
                hex: '#0A1F8F',
                variable: '--color-primary-500'
              },
              {
                name: 'White',
                hex: '#FFFFFF',
                variable: '--color-white'
              }]
              } />
            
          </div>
          <p className="text-sm text-neutral-500 mt-4">
            <strong>Note:</strong> We aim for AA Large (3.0:1) for
            graphics/large text and AA (4.5:1) for normal text.
          </p>
        </section>
      </main>
    </div>);

}