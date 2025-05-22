import React from 'react';

interface BusinessInfoFormProps {
  business: {
    name: string;
    industry: string;
    description: string;
  };
  onUpdate: (business: BusinessInfoFormProps['business']) => void;
}

const BusinessInfoForm: React.FC<BusinessInfoFormProps> = ({ business, onUpdate }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onUpdate({
      ...business,
      [name]: value
    });
  };

  return (
    <div className="form-section">
      <h3>Business Information</h3>
      
      <div className="form-group">
        <label htmlFor="name" className="form-label">Business Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={business.name}
          onChange={handleChange}
          placeholder="Enter your business name"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="industry" className="form-label">Industry</label>
        <select
          id="industry"
          name="industry"
          className="form-control"
          value={business.industry}
          onChange={handleChange}
        >
          <option value="">Select an industry</option>
          <option value="retail">Retail</option>
          <option value="healthcare">Healthcare</option>
          <option value="finance">Finance</option>
          <option value="technology">Technology</option>
          <option value="education">Education</option>
          <option value="hospitality">Hospitality</option>
          <option value="real-estate">Real Estate</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="description" className="form-label">Business Description</label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          value={business.description}
          onChange={handleChange}
          placeholder="Briefly describe your business and what services you offer"
          rows={4}
        />
      </div>
    </div>
  );
};

export default BusinessInfoForm;
