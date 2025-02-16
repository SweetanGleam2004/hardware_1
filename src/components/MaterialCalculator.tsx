import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

type CalculationType = 'tiles' | 'paint' | 'cement';

interface CalculationFields {
  length: number;
  width: number;
  height?: number;
  tileSize?: number;
  wastage: number;
}

export default function MaterialCalculator() {
  const [calculationType, setCalculationType] = useState<CalculationType>('tiles');
  const [fields, setFields] = useState<CalculationFields>({
    length: 0,
    width: 0,
    height: 0,
    tileSize: 2,
    wastage: 10,
  });

  const calculateMaterials = () => {
    switch (calculationType) {
      case 'tiles': {
        const area = fields.length * fields.width;
        const tileArea = (fields.tileSize || 2) * (fields.tileSize || 2);
        const tilesNeeded = Math.ceil((area * (1 + fields.wastage / 100)) / tileArea);
        return `${tilesNeeded} tiles needed`;
      }
      case 'paint': {
        const area = fields.length * fields.width;
        const paintNeeded = Math.ceil((area * (1 + fields.wastage / 100)) / 100); // Assuming 1L covers 100 sq ft
        return `${paintNeeded}L of paint needed`;
      }
      case 'cement': {
        const volume = fields.length * fields.width * (fields.height || 0);
        const cementBags = Math.ceil((volume * (1 + fields.wastage / 100)) / 35); // Assuming 1 bag = 35 sq ft
        return `${cementBags} bags of cement needed`;
      }
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Calculator className="h-6 w-6 text-navy-900" />
        <h2 className="text-xl font-bold text-navy-900">Material Calculator</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculate for
          </label>
          <div className="flex space-x-4">
            {(['tiles', 'paint', 'cement'] as CalculationType[]).map((type) => (
              <button
                key={type}
                onClick={() => setCalculationType(type)}
                className={`px-4 py-2 rounded-lg capitalize ${
                  calculationType === type
                    ? 'bg-navy-900 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Length (ft)
            </label>
            <input
              type="number"
              value={fields.length || ''}
              onChange={(e) =>
                setFields({ ...fields, length: parseFloat(e.target.value) || 0 })
              }
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Width (ft)
            </label>
            <input
              type="number"
              value={fields.width || ''}
              onChange={(e) =>
                setFields({ ...fields, width: parseFloat(e.target.value) || 0 })
              }
              className="w-full p-2 border rounded-lg"
            />
          </div>
          {calculationType === 'cement' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height (ft)
              </label>
              <input
                type="number"
                value={fields.height || ''}
                onChange={(e) =>
                  setFields({ ...fields, height: parseFloat(e.target.value) || 0 })
                }
                className="w-full p-2 border rounded-lg"
              />
            </div>
          )}
          {calculationType === 'tiles' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tile Size (ft)
              </label>
              <select
                value={fields.tileSize}
                onChange={(e) =>
                  setFields({ ...fields, tileSize: parseFloat(e.target.value) })
                }
                className="w-full p-2 border rounded-lg"
              >
                <option value={1}>1x1</option>
                <option value={2}>2x2</option>
                <option value={3}>3x3</option>
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wastage (%)
            </label>
            <input
              type="number"
              value={fields.wastage}
              onChange={(e) =>
                setFields({ ...fields, wastage: parseFloat(e.target.value) || 0 })
              }
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-lg font-semibold text-navy-900">{calculateMaterials()}</p>
        </div>
      </div>
    </div>
  );
}