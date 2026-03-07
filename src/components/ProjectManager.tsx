import React, { useState, useEffect } from 'react';
import { Upload, X, Check, Edit, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

export type Project = {
  id: string | number;
  title: string;
  category: string;
  location: string;
  year: string;
  materials: string[];
  description: string;
  images: string[];
};

const defaultCategories = ['Living Room', 'Bedroom', 'Kitchen', 'Office', 'Dining', 'Wardrobe', 'Custom Furniture'];

const ProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Living Room',
    location: '',
    year: new Date().getFullYear().toString(),
    materials: '',
    description: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]); // For editing
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const data = localStorage.getItem('vanca_projects');
    if (data) {
      setProjects(JSON.parse(data));
    }
  };

  const saveProjects = (newProjects: Project[]) => {
    localStorage.setItem('vanca_projects', JSON.stringify(newProjects));
    setProjects(newProjects);
  };

  const handleOpenForm = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        category: project.category || 'Living Room',
        location: project.location,
        year: project.year,
        materials: project.materials.join(', '),
        description: project.description,
      });
      setExistingImages(project.images || []);
      setPreviews([]);
      setImages([]);
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        category: 'Living Room',
        location: '',
        year: new Date().getFullYear().toString(),
        materials: '',
        description: '',
      });
      setExistingImages([]);
      setPreviews([]);
      setImages([]);
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    previews.forEach(p => URL.revokeObjectURL(p));
  };

  /* IMAGE UPLOAD */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeNewImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  /* PUBLISH / SAVE PROJECT */
  const handleSave = async () => {
    if (!formData.title || !formData.location || !formData.description || (images.length === 0 && existingImages.length === 0)) {
      toast.error('Please fill all required fields and add at least one image');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock image URLs
      const mockImageUrls = images.map(() => `/assets/images/ui/placeholder.webp`);
      const finalImages = [...existingImages, ...mockImageUrls];

      const newProject: Project = {
        id: editingProject ? editingProject.id : crypto.randomUUID?.() || Math.random().toString(36).substring(2, 15),
        title: formData.title,
        category: formData.category,
        location: formData.location,
        year: formData.year,
        materials: formData.materials.split(',').map(m => m.trim()).filter(Boolean),
        description: formData.description,
        images: finalImages,
      };

      let updatedProjects;
      if (editingProject) {
        updatedProjects = projects.map(p => p.id === editingProject.id ? newProject : p);
        toast.success('Project updated successfully');
      } else {
        updatedProjects = [newProject, ...projects];
        toast.success('Project added successfully');
      }

      saveProjects(updatedProjects);
      handleCloseForm();
    } catch (error) {
      toast.error('Error saving project');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id: string | number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const updatedProjects = projects.filter(p => p.id !== id);
      saveProjects(updatedProjects);
      toast.success("Project deleted");
    }
  };

  if (isFormOpen) {
    return (
      <div className="space-y-6 bg-[#0b0b0b] p-6 rounded-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button onClick={handleCloseForm} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
            type="text"
            placeholder="Project Title"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-4 rounded-lg bg-black border border-white/10 text-white"
            />

            <select
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
            className="p-4 rounded-lg bg-black border border-white/10 text-white"
            >
            {defaultCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
            ))}
            </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
                type="text"
                placeholder="Location (e.g., Mumbai, India)"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-4 rounded-lg bg-black border border-white/10 text-white"
            />
            <input
                type="text"
                placeholder="Year (e.g., 2024)"
                value={formData.year}
                onChange={e => setFormData({ ...formData, year: e.target.value })}
                className="w-full p-4 rounded-lg bg-black border border-white/10 text-white"
            />
        </div>

        <input
            type="text"
            placeholder="Materials (comma separated, e.g., Italian Marble, Oak)"
            value={formData.materials}
            onChange={e => setFormData({ ...formData, materials: e.target.value })}
            className="w-full p-4 rounded-lg bg-black border border-white/10 text-white"
        />

        <textarea
          placeholder="Project Description"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full p-4 rounded-lg bg-black border border-white/10 text-white"
        />

        <div className="space-y-4">
            <p className="text-sm text-gray-400">Project Images</p>
            {/* Existing Images */}
            {existingImages.length > 0 && (
                <div className="flex gap-3 flex-wrap mb-4">
                {existingImages.map((img, i) => (
                    <div key={`existing-${i}`} className="relative">
                        <img src={img} alt="Existing" className="w-24 h-24 object-cover rounded-lg border border-white/20" />
                        <button
                            onClick={() => removeExistingImage(i)}
                            className="absolute -top-2 -right-2 bg-red-500 p-1 rounded-full text-white"
                            disabled={isSubmitting}
                        >
                            <X size={12} />
                        </button>
                    </div>
                ))}
                </div>
            )}

            {/* New Images */}
            <label className="inline-flex items-center gap-3 cursor-pointer text-sm text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 px-4 py-2 rounded-lg transition-colors">
                <Upload size={16} />
                Upload New Images
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>

            {/* New Image Previews */}
            {previews.length > 0 && (
                <div className="flex gap-3 flex-wrap mt-4">
                {previews.map((img, i) => (
                    <div key={`new-${i}`} className="relative">
                    <img src={img} alt="Preview" className="w-24 h-24 object-cover rounded-lg border border-white/20" />
                    <button
                        onClick={() => removeNewImage(i)}
                        className="absolute -top-2 -right-2 bg-red-500 p-1 rounded-full text-white"
                        disabled={isSubmitting}
                    >
                        <X size={12} />
                    </button>
                    </div>
                ))}
                </div>
            )}
        </div>

        <button
          onClick={handleSave}
          disabled={isSubmitting}
          className={`px-6 py-4 rounded-xl flex items-center justify-center gap-2 transition-all font-medium w-full
            ${isSubmitting ? 'bg-amber-500/50 text-black/50 cursor-not-allowed' : 'bg-amber-500 text-black hover:bg-amber-400'}`}
        >
          <Check size={18} />
          {isSubmitting ? 'Saving...' : editingProject ? 'Update Project' : 'Publish Project'}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-xl font-bold flex items-center gap-2">Manage Projects</h2>
            <p className="text-sm text-gray-400">Total Projects: {projects.length}</p>
        </div>
        <button
            onClick={() => handleOpenForm()}
            className="flex items-center gap-2 bg-amber-500 text-black px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors font-medium"
        >
            <Plus size={18} />
            Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 bg-[#0a0a0a] rounded-2xl border border-white/5">
            <p className="text-gray-400 mb-4">No projects found.</p>
            <button onClick={() => handleOpenForm()} className="text-amber-500 underline">Create one now</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
                <div key={project.id || index} className="bg-[#0b0b0b] rounded-xl overflow-hidden border border-white/10 group">
                    <div className="h-48 relative overflow-hidden">
                        <img 
                            src={project.images?.[0] || '/assets/images/ui/placeholder.webp'} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                            <button 
                                onClick={() => handleOpenForm(project)}
                                className="p-2 bg-black/60 hover:bg-amber-500 text-white hover:text-black rounded-lg backdrop-blur-sm transition-colors"
                            >
                                <Edit size={16} />
                            </button>
                            <button 
                                onClick={() => handleDelete(project.id)}
                                className="p-2 bg-black/60 hover:bg-red-500 text-white rounded-lg backdrop-blur-sm transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="text-xs text-amber-500 mb-1">{project.category}</div>
                        <h3 className="font-bold text-lg mb-2 truncate">{project.title}</h3>
                        <p className="text-sm text-gray-400 line-clamp-2">{project.description}</p>
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
